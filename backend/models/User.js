const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const hashPassword = require("../config/hashPassword");

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAMAAACZHrEMAAAAY1BMVEX///8AAADl5eX8/Pz29vbq6up1dXXw8PDS0tK0tLTJycnX19fz8/MyMjIQEBAdHR28vLyZmZlAQEDCwsKNjY0VFRUkJCQ3Nzd8fHyDg4MpKSnd3d2pqalfX19UVFRHR0dsbGw2JLsCAAAEY0lEQVR4nO1b15ajMAxN6Cl0QkhC+/+v3JnsWhYlYGyZmT3H9zUGX2R1OYeDgYGBgYGBgYGBgcH/DMd1Lct1nZ/mcXCSwmvDMorKsPWKk/9zTII0Po4QF4H9A0zspI3GVN5ok93pJOEskzeep12pXNrPVL7RBftxSZepfCPdiYrfrXM5HjN3Dy6vuwiXL8156edyuY13Ldu+qvq2nNDRrjiX4X53L/Httynbtp972a5s3OfgJJKRYvj54PfS0snFxmdxz+eWnLF0Yp0B64E2Kj5s5BRoUaWPS4K2mRXLX5zRMm3OGClMeFlaiKxfm9og+a/4kBdf+dDDxeI7LMplxEaPaCp4f72+uIbFng4uL8ikGpHlPVt90xEWeKgWCoE+9wEayIApCaokqHtJzyVg734KaqQLueCZnAycUi/6hMeeoE+04NXCoRhk2VNn6D6zpfIq+ojDzimiLqcsic8Ex0Tt9yD4bVAAUDNqDQaPuiEMJxIfIASZrwQNpnZ74MJWYyQHREvqyA053oZI40a6yWyQjKVLMnBMMjpDTeZXWZOMn4EPWEjepQCWsSFxAw+8Qc+E4LMSuxSuyyA2Haljkw1ppHDUhrK8Ie+rgTkJnxOcEn3e+asyvcNt44dCNIvouaB6Uii9usJyHTXlC0TTiyyHNDWiNuw3wJ5EvDBvWAiVfJuB6ucttbamPiNI/hivWBRqnvR6uBws3ugMF9lYvD9z09bWO3HhLzniAC0TaFhIwm7QNh/DN27m00cCDgfPUu6znnXQ7XwKV3wyCAbjri4YbXYdjltumrvSuJP5hazIgc/1nI5GHNRJ1QTBdP7WeY+HNzNq0RAgxzhPd52Hdrl8wxWaN3Va5wYcdrXOxdtrapr362SafYamyXTKNYvbSbtwXs06DYZWr5uxi3UKGJXGeVOQfdg0mh/+f0V3bb6mntktq+o8PwfBOc/ras7m9Qy4nYkN9ekki3ulk1WNhqsj9ujGwT21Zq3FturRYWbkodsa7tAkS4uTocktp4USXAZj/m5VLYOBHEPSpPw6uKBSCxisPdD2kFBvrviMRBXSx6p8p2ODVeDTOHsKGyfDLRUX/NJN8Q/PwYn6Ijl/49akFqfMi/YnChdVZJudO2Ij2tdZBNJDiUCDUmaCDgBKeaUEjQ5ZOSl2ePCTVEGu/sr2zX2X9KSRNy8UI7jDc0zpz+Lj9lhNNFzGCgl2QiMaXugreVDw4E+VNJSbglJuza+wqRQwkAj0KlxQs1xBwPyCoGJeDaKJ5CUM6tupcUEilo+XoL7KtSoYlPT9FQeMQDnG8Wgr62qguUlwbQpUWLb9CeNjgo4COAnJsYbTqIoWvwyMW87vQc89U+dyOLDov9bp/wDaqwwylykQ4JhJWu6Qi8jlwie1x0dI1D6NCTYi6bFAMiznJ1gmfiOZ68FtzF7qcWbZMUnZbrGcUa5IYMEtJvk7w5WRkcsiXOsfaFqo7G27/FPDwMDAwMDAwMDAwGAz/gBOeyutn9804wAAAABJRU5ErkJggg==",
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("User", User);
