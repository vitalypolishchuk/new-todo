declare module "*.png";
declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

declare module "*.module.scss" {
  const styles: { [key: string]: string };
  export default styles;
}

declare module "*.svg" {
  const content: any;
  export default content;
}
