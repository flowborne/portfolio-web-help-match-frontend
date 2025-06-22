
export interface FilterOption {
  imageSrc: string
  value: string
  labelKey: string
}

export const filters: FilterOption[] = [
  {
    imageSrc: "https://res.cloudinary.com/dnxyukpec/image/upload/v1744979159/military_ecqhyk.avif",
    value: "military",
    labelKey: "categories.military"
  },
  {
    imageSrc: "https://res.cloudinary.com/dnxyukpec/image/upload/v1744979407/medicine_bs987e.jpg",
    value: "medicine",
    labelKey: "categories.medicine"
  },
  {
    imageSrc: "https://res.cloudinary.com/dnxyukpec/image/upload/v1744988546/sitting-golden-retriever-cream-looking-camera_191971-29414_gwyvkc.avif",
    value: "pets",
    labelKey: "categories.pets"
  },
  {
    imageSrc: "https://res.cloudinary.com/dnxyukpec/image/upload/v1744988679/depositphotos_218019310-stock-photo-mens-black-leather-jacket-isolated_ciznpy.webp",
    value: "clothes",
    labelKey: "categories.clothes"
  },
  {
    imageSrc: "https://res.cloudinary.com/dnxyukpec/image/upload/v1744988763/modern-black-smartphone-isolated-white-background-vector_532963-3059_uxpcuu.avif",
    value: "technique",
    labelKey: "categories.technique"
  },
  {
    imageSrc: "https://res.cloudinary.com/dnxyukpec/image/upload/v1744988862/Food_guide_plate_ueufe6.jpg",
    value: "food",
    labelKey: "categories.food"
  },
  {
    imageSrc: "https://res.cloudinary.com/dnxyukpec/image/upload/v1744989049/m604727_fqg273.jpg",
    value: "auto",
    labelKey: "categories.auto"
  },
  {
    imageSrc: "https://res.cloudinary.com/dnxyukpec/image/upload/v1744989359/handshake-human-help-icon-vector-19599349_gv0d2a.jpg",
    value: "other",
    labelKey: "categories.other"
  },
];
