export default function Vars(){

    return {
      size: SIZE,
      maxValue: MAX_VALUE,
      icon: {
        base:     BASE_IMG_BKG,
        selected: SELECTED_IMG_BKG
      },
      styles: {
        element: ELEMENT_STYLE
      },
      templates : {
        css:  elementTemplate,
        html: starTemplate
      }

    };
}

export const SIZE             = "36px";
export const MAX_VALUE        = 5;
export const BASE_IMG_BKG     = 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjQ0NDQ0NDIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHdpZHRoPSIxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik05IDExLjNsMy43MSAyLjctMS40Mi00LjM2TDE1IDdoLTQuNTVMOSAyLjUgNy41NSA3SDNsMy43MSAyLjY0TDUuMjkgMTR6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDE4djE4SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==';
export const SELECTED_IMG_BKG = 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRjFDNDBGIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHdpZHRoPSIxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik05IDExLjNsMy43MSAyLjctMS40Mi00LjM2TDE1IDdoLTQuNTVMOSAyLjUgNy41NSA3SDNsMy43MSAyLjY0TDUuMjkgMTR6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDE4djE4SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==';
export const ELEMENT_STYLE    = `display: flex;
                                 display: -webkit-flex;
                                 -webkit-align-items: center;
                                 -ms-align-items: center;
                                 -moz-align-items: center;
                                 align-items: center;
                                 -webkit-justify-content: center;
                                 -ms-justify-content: center;
                                 -moz-justify-content: center;
                                 justify-content: center;
                                 width: 100%;`;
