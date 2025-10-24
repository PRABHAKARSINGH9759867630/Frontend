import { 
  type User, 
  type InsertUser, 
  type HeroImage, 
  type InsertHeroImage, 
  type PrincipalMessage, 
  type InsertPrincipalMessage 
} from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Hero Images
  getHeroImages(): Promise<HeroImage[]>;
  getHeroImage(id: string): Promise<HeroImage | undefined>;
  insertHeroImage(image: InsertHeroImage): Promise<HeroImage>;
  updateHeroImage(id: string, image: InsertHeroImage): Promise<HeroImage | undefined>;
  deleteHeroImage(id: string): Promise<boolean>;
  
  // Principal Message
  getPrincipalMessage(): Promise<PrincipalMessage | undefined>;
  insertPrincipalMessage(message: InsertPrincipalMessage): Promise<PrincipalMessage>;
  updatePrincipalMessage(id: string, message: InsertPrincipalMessage): Promise<PrincipalMessage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private heroImages: Map<string, HeroImage>;
  private principalMessages: Map<string, PrincipalMessage>;

  constructor() {
    this.users = new Map();
    this.heroImages = new Map();
    this.principalMessages = new Map();
    
    // Initialize with some default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Add default hero images
    const defaultHeroImages: HeroImage[] = [
      {
        id: "1",
        name: "School Campus Hero",
        imageUrl: "/assets/generated_images/School_campus_hero_image_574848a6.png",
        description: "Main school campus hero image",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2", 
        name: "Science Lab Hero",
        imageUrl: "/assets/generated_images/Science_lab_campus_tour_9f1f27cd.png",
        description: "Science laboratory hero image",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        name: "Sports Facilities Hero", 
        imageUrl: "/assets/generated_images/Sports_facilities_image_2ec22754.png",
        description: "Sports facilities hero image",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    defaultHeroImages.forEach(image => {
      this.heroImages.set(image.id, image);
    });

    // Add default principal message
    const defaultPrincipalMessage: PrincipalMessage = {
      id: "1",
      name: "Ms. Rupali Puri",
      title: "Principal, Excellence Academy",
      message: "Welcome to Excellence Academy, where we believe every child has the potential to achieve greatness. Our commitment to academic excellence, combined with holistic development, ensures that our students are well-prepared for the challenges of tomorrow. Together, we create a nurturing environment where curiosity thrives and dreams take flight.",
      heroImageId: "1", // Use the first hero image
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.principalMessages.set(defaultPrincipalMessage.id, defaultPrincipalMessage);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Hero Images methods
  async getHeroImages(): Promise<HeroImage[]> {
    return Array.from(this.heroImages.values());
  }

  async getHeroImage(id: string): Promise<HeroImage | undefined> {
    return this.heroImages.get(id);
  }

  async insertHeroImage(image: InsertHeroImage): Promise<HeroImage> {
    const id = randomUUID();
    const now = new Date();
    const heroImage: HeroImage = { 
      ...image, 
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.heroImages.set(id, heroImage);
    return heroImage;
  }

  async updateHeroImage(id: string, image: InsertHeroImage): Promise<HeroImage | undefined> {
    const existing = this.heroImages.get(id);
    if (!existing) return undefined;
    
    const updated: HeroImage = { 
      ...existing, 
      ...image, 
      updatedAt: new Date() 
    };
    this.heroImages.set(id, updated);
    return updated;
  }

  async deleteHeroImage(id: string): Promise<boolean> {
    return this.heroImages.delete(id);
  }

  // Principal Message methods
  async getPrincipalMessage(): Promise<PrincipalMessage | undefined> {
    // Return the first (and typically only) principal message
    return Array.from(this.principalMessages.values())[0];
  }

  async insertPrincipalMessage(message: InsertPrincipalMessage): Promise<PrincipalMessage> {
    const id = randomUUID();
    const now = new Date();
    const principalMessage: PrincipalMessage = { 
      ...message, 
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.principalMessages.set(id, principalMessage);
    return principalMessage;
  }

  async updatePrincipalMessage(id: string, message: InsertPrincipalMessage): Promise<PrincipalMessage | undefined> {
    const existing = this.principalMessages.get(id);
    if (!existing) return undefined;
    
    const updated: PrincipalMessage = { 
      ...existing, 
      ...message, 
      updatedAt: new Date() 
    };
    this.principalMessages.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
