import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertHeroImageSchema, insertPrincipalMessageSchema } from "../shared/schema";

// Simple in-memory cache for Instagram API responses
let instagramCache: { data: any; cachedAt: number } | null = null;
const INSTAGRAM_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function registerRoutes(app: Express): Promise<Server> {
  // Hero Images API
  app.get("/api/hero-images", async (req, res) => {
    try {
      const images = await storage.getHeroImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hero images" });
    }
  });

  app.post("/api/hero-images", async (req, res) => {
    try {
      const validatedData = insertHeroImageSchema.parse(req.body);
      const image = await storage.insertHeroImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      res.status(400).json({ error: "Invalid data or failed to create hero image" });
    }
  });

  app.put("/api/hero-images/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertHeroImageSchema.parse(req.body);
      const image = await storage.updateHeroImage(id, validatedData);
      if (!image) {
        return res.status(404).json({ error: "Hero image not found" });
      }
      res.json(image);
    } catch (error) {
      res.status(400).json({ error: "Invalid data or failed to update hero image" });
    }
  });

  app.delete("/api/hero-images/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteHeroImage(id);
      if (!success) {
        return res.status(404).json({ error: "Hero image not found" });
      }
      res.json({ message: "Hero image deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete hero image" });
    }
  });

  // Principal Message API
  app.get("/api/principal-message", async (req, res) => {
    try {
      const message = await storage.getPrincipalMessage();
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch principal message" });
    }
  });

  app.post("/api/principal-message", async (req, res) => {
    try {
      const validatedData = insertPrincipalMessageSchema.parse(req.body);
      const message = await storage.insertPrincipalMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid data or failed to create principal message" });
    }
  });

  app.put("/api/principal-message/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPrincipalMessageSchema.parse(req.body);
      const message = await storage.updatePrincipalMessage(id, validatedData);
      if (!message) {
        return res.status(404).json({ error: "Principal message not found" });
      }
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid data or failed to update principal message" });
    }
  });

  // Instagram proxy endpoint
  app.get("/api/instagram", async (_req, res) => {
    try {
      const now = Date.now();
      if (instagramCache && now - instagramCache.cachedAt < INSTAGRAM_CACHE_TTL_MS) {
        return res.json(instagramCache.data);
      }

      const accessToken = process.env.IG_LONG_LIVED_TOKEN;
      if (!accessToken) {
        return res.status(500).json({ error: "Instagram access token not configured" });
      }

      const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,thumbnail_url,timestamp&access_token=${accessToken}`;
      const response = await fetch(url);
      if (!response.ok) {
        const text = await response.text();
        return res.status(502).json({ error: "Instagram fetch failed", detail: text });
      }
      const data = await response.json();
      instagramCache = { data, cachedAt: now };
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch Instagram data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
