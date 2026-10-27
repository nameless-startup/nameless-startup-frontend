import { Place, CreatePlaceDto, UpdatePlaceDto } from "@/types";
import { places } from "@/data/places";

export const placeService = {
  index: async (): Promise<Place[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...places]), 400);
    });
  },

  show: async (id: string): Promise<Place> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const place = places.find((p) => p.id === id);
        if (place) {
          resolve(place);
        } else {
          reject(new Error("Place not found"));
        }
      }, 400);
    });
  },

  create: async (dto: CreatePlaceDto): Promise<Place> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPlace: Place = {
          ...dto,
          id: String(Date.now()),
        };
        resolve(newPlace);
      }, 500);
    });
  },

  update: async (id: string, dto: UpdatePlaceDto): Promise<Place> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = places.findIndex((p) => p.id === id);
        if (index === -1) {
          reject(new Error("Place not found"));
          return;
        }
        const updated: Place = { ...places[index], ...dto };
        resolve(updated);
      }, 500);
    });
  },

  destroy: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = places.some((p) => p.id === id);
        if (exists) {
          resolve();
        } else {
          reject(new Error("Place not found"));
        }
      }, 400);
    });
  },
};