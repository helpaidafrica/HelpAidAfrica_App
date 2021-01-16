// var JSZip = require("jszip.js");
import JSZip from './jszip'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

module.exports.makeZip = async () => {
    var zip = new JSZip();
    zip.file("hello.txt", "Hello WorldHello \n");

    var promise = null;
    zip.generateAsync({ type: 'nodebuffer' }).then(async function(blob) {
        let PTH = "file:///var/mobile/Containers/Data/Application/D73F766E-9E12-46C5-A747-245FD7A8883B/Library/Caches/ExponentExperienceData/%2540mjafri118%252Fhaa/ImagePicker/hi.zip"
        let r = await FileSystem.writeAsStringAsync(PTH, blob, { encoding: "FileSystem.EncodingType.Base64" })
        return r;
    })

    return "DONEE"

    if (JSZip.support.uint8array) {
        promise = zip.generateAsync({ type: "uint8array" });
    } else {
        promise = zip.generateAsync({ type: "string" });
    }

    return promise

}