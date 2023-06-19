export interface Border {
  style: string;
  width: number;
  color: string;
}

export interface Shadow {
  xOffset: number;
  yOffset: number;
  blurRadius: number;
  color: string;
}

export interface MarginPadding {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface CV {
  [section: string]: string[];
}

export interface Size{
  rows: number;
    cols: number;
}

export interface Terminal {
  prompt: string;
  fontFamily: string;
  fontSize: number;
  bodyBackground: string;
  background: string;
  textColor: string;
  cursorColor: string;
  textShadow: Shadow;
  boxShadow: Shadow;
  borderRadius: number;
  border: Border;
  size:Size
  margin: MarginPadding;
  padding: MarginPadding;
}

export interface CVSchema {
  $schema: string;
  type: string;
  additionalProperties: {
    type: string;
    items: {
      type: string;
    };
  };
}
