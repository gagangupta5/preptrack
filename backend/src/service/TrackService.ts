import { Track } from "../model/Track";
import { TrackRepository } from "../repository/TrackRepository";

export class TrackService {
  private trackRepository: TrackRepository;

  constructor() {
    this.trackRepository = new TrackRepository();
  }

  async create(track: Partial<Track>): Promise<Track> {
    return this.trackRepository.createAndSave(track);
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.findAll();
  }

  async findById(id: string): Promise<Track | null> {
    return this.trackRepository.findById(id);
  }

  async update(id: string, track: Partial<Track>): Promise<Track | null> {
    return this.trackRepository.update(id, track);
  }

  async findBySlug(slug: string): Promise<Track | null> {
    return this.trackRepository.findBySlug(slug);
  }

  async delete(id: string): Promise<boolean> {
    return this.trackRepository.delete(id);
  }
}
