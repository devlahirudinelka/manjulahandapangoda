/**
 * All photography used on the site.
 *
 * The photos currently load from the existing site (manjula.ceylexa.com).
 * To host them inside this project instead, run:
 *
 *   node scripts/download-images.mjs
 *
 * which saves every file into /public/images and flips USE_LOCAL_IMAGES to true.
 */
export const USE_LOCAL_IMAGES = false;

export const REMOTE_IMAGE_BASE =
  "https://manjula.ceylexa.com/wp-content/uploads/2026/08/";
const LOCAL_IMAGE_BASE = "/images/";

export type Style = "kandyan" | "western" | "indian";

export type Photo = {
  file: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position, used when the photo is cropped. */
  position?: string;
  style?: Style;
};

export function photoSrc(photo: Photo) {
  return (USE_LOCAL_IMAGES ? LOCAL_IMAGE_BASE : REMOTE_IMAGE_BASE) + photo.file;
}

const portrait = { width: 1365, height: 2048 };

/** Gold "MH" monogram. */
export const logo: Photo = {
  file: "Manjula-1-1024x234.png",
  width: 1024,
  height: 234,
  alt: "Manjula Handapangoda monogram",
};

export const photos = {
  // Wide, landscape frames
  terrace: {
    file: "5-scaled.webp",
    width: 2560,
    height: 1209,
    alt: "Kandyan bride in an ivory saree leaning on a terrace balustrade",
    position: "50% 35%",
    style: "kandyan",
  },
  bouquet: {
    file: "6-scaled.webp",
    width: 2560,
    height: 1209,
    alt: "Bride holding a white bouquet beside a colonnade",
    position: "40% 40%",
    style: "kandyan",
  },
  couple: {
    file: "3-scaled.webp",
    width: 2560,
    height: 1209,
    alt: "Kandyan bride and groom in a tropical garden",
    position: "50% 40%",
    style: "kandyan",
  },
  goldDetail: {
    file: "1-scaled.webp",
    width: 2560,
    height: 1209,
    alt: "Close-up of a bride wearing a gold forehead ornament",
    position: "60% 40%",
    style: "kandyan",
  },

  // Portrait frames
  kandyanIvory: {
    file: "583900882_1303902988201306_5973537707784038077_n.webp",
    ...portrait,
    alt: "Kandyan bride with jasmine and a jewelled headpiece",
    style: "kandyan",
  },
  westernVeil: {
    file: "487388178_1122566656334941_837570757067735332_n.webp",
    ...portrait,
    alt: "Western bride with a soft veil and luminous makeup",
    style: "western",
  },
  indianRed: {
    file: "638286808_1376661327592138_3300157532506103207_n.webp",
    ...portrait,
    alt: "Indian bride in red with gold jewellery and a red bouquet",
    style: "indian",
  },
  kandyanGold: {
    file: "480007932_1087967979794809_8937555156353255810_n.webp",
    ...portrait,
    alt: "Bride in a gold headpiece and layered necklaces",
    style: "kandyan",
  },
  kandyanCover: {
    file: "611133976_1339241641334107_2520234790864766321_n-683x1024.webp",
    width: 683,
    height: 1024,
    alt: "Kandyan bridal portrait with traditional gold jewellery",
    style: "kandyan",
  },
  indianCover: {
    file: "479223243_1088530133071927_1849437079635784257_n-683x1024.webp",
    width: 683,
    height: 1024,
    alt: "Indian bride in a red saree with a gold maang tikka",
    style: "indian",
  },
  westernCover: {
    file: "487518365_1122569116334695_965258627475878094_n-683x1024.webp",
    width: 683,
    height: 1024,
    alt: "Western bride in a tiara and cathedral veil holding white roses",
    style: "western",
  },
  manjula: {
    file: "592748185_1314918143766457_3797252916543210256_n-685x1024.webp",
    width: 685,
    height: 1024,
    alt: "Portrait of Manjula Handapangoda",
    position: "50% 25%",
  },
  indianPurple: {
    file: "477037541_1086242083300732_3482978228191682817_n.webp",
    ...portrait,
    alt: "Bride in a purple and gold saree with a maang tikka",
    style: "indian",
  },
  kandyanSilver: {
    file: "479276199_1088526819738925_4798301468929869331_n.webp",
    ...portrait,
    alt: "Bride in a silver saree holding a white bouquet",
    style: "kandyan",
  },
  kandyanProfile: {
    file: "484960875_1112474270677513_4711678850819223445_n.webp",
    ...portrait,
    alt: "Side profile of a bride with a floral bun",
    style: "kandyan",
  },
  sareeGarden: {
    file: "488050222_1124855046106102_1049613688983901642_n.webp",
    ...portrait,
    alt: "Woman in a draped silk saree in a garden",
    style: "indian",
  },
  kandyanWhite: {
    file: "481899179_1104420994816174_4269120996239324724_n.webp",
    ...portrait,
    alt: "Bride in white with a jewelled headpiece and bouquet",
    style: "kandyan",
  },
  goldPortrait: {
    file: "484791901_10212673385225311_4927739603958383990_n.webp",
    ...portrait,
    alt: "Bride with gold jewellery in warm evening light",
    style: "kandyan",
  },
  softGlam: {
    file: "485364906_10212694647396852_2419289164733889181_n.webp",
    ...portrait,
    alt: "Bride with long loose waves and soft glam makeup",
    style: "western",
  },
  laceVeil: {
    file: "672411032_1423654269559510_7060816022954195918_n.webp",
    ...portrait,
    alt: "Bride in a lace veil touching her shoulder",
    style: "western",
  },
  westernFull: {
    file: "730354214_2236995043770863_3943876796513254601_n.webp",
    ...portrait,
    alt: "Full-length bride in a white gown with a white bouquet",
    style: "western",
  },
  goldGaze: {
    file: "479881648_1087967573128183_4655857479038643598_n.webp",
    ...portrait,
    alt: "Bride with a gold headpiece looking at the camera",
    style: "kandyan",
  },
  goldGlow: {
    file: "476602938_3847317505482785_2569033145392647255_n.webp",
    ...portrait,
    alt: "Close-up of a bride with a gold headpiece and glowing skin",
    style: "kandyan",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/** Order used by the gallery page. */
export const galleryOrder: PhotoKey[] = [
  "kandyanIvory",
  "westernVeil",
  "indianRed",
  "goldGaze",
  "laceVeil",
  "kandyanProfile",
  "indianPurple",
  "kandyanSilver",
  "westernFull",
  "goldPortrait",
  "sareeGarden",
  "kandyanWhite",
  "softGlam",
  "goldGlow",
  "kandyanCover",
  "westernCover",
  "indianCover",
  "kandyanGold",
];
