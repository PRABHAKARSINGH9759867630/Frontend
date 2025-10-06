import { GalleryPreview } from "../GalleryPreview";
import sportsImage from "@assets/generated_images/Sports_facilities_image_2ec22754.png";
import labImage from "@assets/generated_images/Science_lab_campus_tour_9f1f27cd.png";

export default function GalleryPreviewExample() {
  const items = [
    { id: 1, image: sportsImage, caption: "Sports Day 2024" },
    { id: 2, image: labImage, caption: "Science Lab" },
    { id: 3, image: sportsImage, caption: "Annual Function" },
    { id: 4, image: labImage, caption: "Classroom" },
    { id: 5, image: sportsImage, caption: "Art Exhibition" },
    { id: 6, image: labImage, caption: "Library" },
    { id: 7, image: sportsImage, caption: "Music Room" },
    { id: 8, image: labImage, caption: "Campus" },
  ];

  return <GalleryPreview items={items} />;
}
