import React from "react";

declare module "*.svg?react" {
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
