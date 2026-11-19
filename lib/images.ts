/**
 * All photography used on the site.
 *
 * Every file lives in /public/images, copied from the original WordPress
 * uploads folder. To use a new photo, drop it into /public/images, add an entry
 * below. Gallery photos are listed in lib/gallery.ts.
 */
const IMAGE_BASE = "/images/";

export type Style =
  | "kandyan"
  | "western"
  | "indian"
  | "homecoming"
  | "dressing"
  | "behind";

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
  return IMAGE_BASE + photo.file;
}

const portrait = { width: 1365, height: 2048 };

/** Gold "MH" monogram. */
export const logo: Photo = {
  file: "logo.png",
  width: 1200,
  height: 445,
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
    width: 1366,
    height: 2048,
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
    file: "611133976_1339241641334107_2520234790864766321_n.webp",
    width: 1365,
    height: 2048,
    alt: "Kandyan bridal portrait with traditional gold jewellery",
    style: "kandyan",
  },
  indianCover: {
    file: "479223243_1088530133071927_1849437079635784257_n.webp",
    width: 1365,
    height: 2048,
    alt: "Indian bride in a red saree with a gold maang tikka",
    style: "indian",
  },
  westernCover: {
    file: "487518365_1122569116334695_965258627475878094_n.webp",
    width: 1365,
    height: 2048,
    alt: "Western bride in a tiara and cathedral veil holding white roses",
    style: "western",
  },
  manjula: {
    file: "gallery/manjula-03.webp",
    width: 1468,
    height: 2048,
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
    width: 1363,
    height: 2048,
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
    width: 1363,
    height: 2048,
    alt: "Bride in a lace veil touching her shoulder",
    style: "western",
  },
  westernFull: {
    file: "730354214_2236995043770863_3943876796513254601_n.webp",
    width: 1366,
    height: 2048,
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
  veilRoses: {
    file: "482247760_1065285505636288_4250246547233663119_n.webp",
    width: 960,
    height: 1440,
    alt: "Bride in a white saree and veil holding white roses",
  },
  osariSeated: {
    file: "577799721_1358317752749216_2023409519837827080_n.webp",
    width: 1365,
    height: 2048,
    alt: "Seated bride in an ivory osari holding a white bouquet",
  },
  pearlsLook: {
    file: "BDW02035-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Bride with a pearl headpiece and layered pearl necklaces",
  },
  garden: {
    file: "BDW02073-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Full-length bride in a beaded osari with a cascade bouquet",
  },
  hairBack: {
    file: "BDW02108-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Back view of a bridal bun dressed with white flowers",
  },
  windowLight: {
    file: "BDW06124-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Smiling bride in soft window light with a floral bun",
  },
  strapless: {
    file: "BDW08557-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Bride in a strapless white gown with a delicate tiara",
  },
  osariBouquet: {
    file: "BDW09147.jpg-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Bride in a pearl-embellished osari with white orchids",
  },
  veilSide: {
    file: "CSW09711-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Bride in profile wearing a lace veil and floral hair piece",
  },
  orchidHair: {
    file: "DSC07713-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Bride with white orchids in her hair and layered pearl jewellery",
  },
  suiteBride: {
    file: "HAR08343-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Bride with a teardrop orchid bouquet in a hotel suite",
  },
  lakeside: {
    file: "PUL_9878-scaled.webp",
    width: 1703,
    height: 2560,
    alt: "Bride in white with a pink and white bouquet beside a lake",
  },
  coupleLawn: {
    file: "SKL03693-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Bride and groom in white on a lawn with an orchid bouquet",
  },
  coupleSuit: {
    file: "SMS09705-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Bride and groom in a dark suit with a teardrop bouquet",
  },
  lehengaBlue: {
    file: "VIDL1962.jpg-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Bride in a powder-blue lehenga seated with a peach bouquet",
  },
  lehengaDoor: {
    file: "VIDL1990-scaled.webp",
    width: 1707,
    height: 2560,
    alt: "Bride in a pastel lehenga in a doorway holding roses",
  },
  windowKiss: {
    file: "m3-scaled.webp",
    width: 1969,
    height: 2560,
    alt: "Bride and groom sharing a kiss beside a white-paned window",
  },
  prepFitting: {
    file: "m1-scaled.webp",
    width: 1969,
    height: 2560,
    alt: "Finishing touches to a bride’s makeup before the ceremony",
  },
  prepTouchUp: {
    file: "m2-scaled.webp",
    width: 1969,
    height: 2560,
    alt: "Bridal makeup touch-up in black and white",
  },
  prepSaree: {
    file: "m4-scaled.webp",
    width: 1969,
    height: 2560,
    alt: "Bride being dressed while makeup is finished",
  },
  prepTeam: {
    file: "1.jpg-scaled.webp",
    width: 2560,
    height: 1707,
    alt: "The team dressing a bride in an ivory osari",
  },
  manjulaAward: {
    file: "gallery/manjula-01.webp",
    width: 1367,
    height: 2048,
    alt: "Manjula Handapangoda holding an award",
    position: "50% 20%",
  },
  manjulaTrophy: {
    file: "gallery/manjula-04.webp",
    width: 1497,
    height: 2048,
    alt: "Manjula Handapangoda raising a gold award",
    position: "50% 20%",
  },
  manjulaSuit: {
    file: "gallery/manjula-05.webp",
    width: 1454,
    height: 2048,
    alt: "Manjula Handapangoda in a dark suit with an award",
    position: "50% 20%",
  },
  homecomingRed: {
    file: "gallery/homecoming-02.webp",
    width: 1364,
    height: 2048,
    alt: "Homecoming bride in a red beaded saree with orange flowers",
    position: "50% 30%",
  },
  occasionSaree: {
    file: "gallery/dressing-03.webp",
    width: 1365,
    height: 2048,
    alt: "Saree dressing with a floral print and a tiara",
    position: "50% 25%",
  },
  occasionGlam: {
    file: "gallery/dressing-06.webp",
    width: 1365,
    height: 2048,
    alt: "Party makeup with a sleek updo and orange saree",
    position: "50% 25%",
  },
  bridesmaids: {
    file: "gallery/kandyan-20.webp",
    width: 2048,
    height: 1365,
    alt: "Kandyan bride with bridesmaids in lilac sarees",
    position: "50% 40%",
  },
  occasionLace: {
    file: "gallery/dressing-07.webp",
    width: 1365,
    height: 2048,
    alt: "Smiling portrait in a white lace dress outdoors",
    position: "50% 25%",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
