import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "text" })
  password!: string;

  @Column({ type: "boolean", default: false })
  isVerified!: boolean;

  @Column({ type: "varchar", nullable: true })
  profileUrl?: boolean;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
