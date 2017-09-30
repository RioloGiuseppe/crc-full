"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crcUtil_1 = require("./crcUtil");
var CRC = (function () {
    function CRC(width, name, polynomial, initial, finalXor, inputReflected, resultReflected) {
        this._width = width;
        this._name = name;
        this._polynomial = polynomial;
        this._initialVal = initial;
        this._finalXorVal = finalXor;
        this._inputReflected = inputReflected;
        this._resultReflected = resultReflected;
        switch (width) {
            case 8:
                this._castMask = 0xFF;
                break;
            case 16:
                this._castMask = 0xFFFF;
                break;
            case 32:
                this._castMask = 0xFFFFFFFF;
                break;
            default:
                throw "Invalid CRC width";
        }
        this._msbMask = 0x01 << (this._width - 1);
    }
    Object.defineProperty(CRC.prototype, "width", {
        get: function () { return this._width; },
        set: function (v) {
            this._width = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "name", {
        get: function () { return this._name; },
        set: function (v) {
            this._name = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "polynomial", {
        get: function () { return this._polynomial; },
        set: function (v) {
            this._polynomial = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "initial", {
        get: function () { return this._initialVal; },
        set: function (v) {
            this._initialVal = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "finalXor", {
        get: function () { return this._finalXorVal; },
        set: function (v) {
            this._finalXorVal = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "inputReflected", {
        get: function () { return this._inputReflected; },
        set: function (v) {
            this._inputReflected = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "resultReflected", {
        get: function () { return this._resultReflected; },
        set: function (v) {
            this._resultReflected = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC, "defaults", {
        get: function () {
            if (!this._list) {
                this._list = [
                    new CRC(8, "CRC8", 0x07, 0x00, 0x00, false, false),
                    new CRC(8, "CRC8_SAE_J1850", 0x1D, 0xFF, 0xFF, false, false),
                    new CRC(8, "CRC8_SAE_J1850_ZERO", 0x1D, 0x00, 0x00, false, false),
                    new CRC(8, "CRC8_8H2F", 0x2F, 0xFF, 0xFF, false, false),
                    new CRC(8, "CRC8_CDMA2000", 0x9B, 0xFF, 0x00, false, false),
                    new CRC(8, "CRC8_DARC", 0x39, 0x00, 0x00, true, true),
                    new CRC(8, "CRC8_DVB_S2", 0xD5, 0x00, 0x00, false, false),
                    new CRC(8, "CRC8_EBU", 0x1D, 0xFF, 0x00, true, true),
                    new CRC(8, "CRC8_ICODE", 0x1D, 0xFD, 0x00, false, false),
                    new CRC(8, "CRC8_ITU", 0x07, 0x00, 0x55, false, false),
                    new CRC(8, "CRC8_MAXIM", 0x31, 0x00, 0x00, true, true),
                    new CRC(8, "CRC8_ROHC", 0x07, 0xFF, 0x00, true, true),
                    new CRC(8, "CRC8_WCDMA", 0x9B, 0x00, 0x00, true, true),
                    new CRC(16, "CRC16_CCIT_ZERO", 0x1021, 0x0000, 0x0000, false, false),
                    new CRC(16, "CRC16_ARC", 0x8005, 0x0000, 0x0000, true, true),
                    new CRC(16, "CRC16_AUG_CCITT", 0x1021, 0x1D0F, 0x0000, false, false),
                    new CRC(16, "CRC16_BUYPASS", 0x8005, 0x0000, 0x0000, false, false),
                    new CRC(16, "CRC16_CCITT_FALSE", 0x1021, 0xFFFF, 0x0000, false, false),
                    new CRC(16, "CRC16_CDMA2000", 0xC867, 0xFFFF, 0x0000, false, false),
                    new CRC(16, "CRC16_DDS_110", 0x8005, 0x800D, 0x0000, false, false),
                    new CRC(16, "CRC16_DECT_R", 0x0589, 0x0000, 0x0001, false, false),
                    new CRC(16, "CRC16_DECT_X", 0x0589, 0x0000, 0x0000, false, false),
                    new CRC(16, "CRC16_DNP", 0x3D65, 0x0000, 0xFFFF, true, true),
                    new CRC(16, "CRC16_EN_13757", 0x3D65, 0x0000, 0xFFFF, false, false),
                    new CRC(16, "CRC16_GENIBUS", 0x1021, 0xFFFF, 0xFFFF, false, false),
                    new CRC(16, "CRC16_MAXIM", 0x8005, 0x0000, 0xFFFF, true, true),
                    new CRC(16, "CRC16_MCRF4XX", 0x1021, 0xFFFF, 0x0000, true, true),
                    new CRC(16, "CRC16_RIELLO", 0x1021, 0xB2AA, 0x0000, true, true),
                    new CRC(16, "CRC16_T10_DIF", 0x8BB7, 0x0000, 0x0000, false, false),
                    new CRC(16, "CRC16_TELEDISK", 0xA097, 0x0000, 0x0000, false, false),
                    new CRC(16, "CRC16_TMS37157", 0x1021, 0x89EC, 0x0000, true, true),
                    new CRC(16, "CRC16_USB", 0x8005, 0xFFFF, 0xFFFF, true, true),
                    new CRC(16, "CRC16_A", 0x1021, 0xC6C6, 0x0000, true, true),
                    new CRC(16, "CRC16_KERMIT", 0x1021, 0x0000, 0x0000, true, true),
                    new CRC(16, "CRC16_MODBUS", 0x8005, 0xFFFF, 0x0000, true, true),
                    new CRC(16, "CRC16_X_25", 0x1021, 0xFFFF, 0xFFFF, true, true),
                    new CRC(16, "CRC16_XMODEM", 0x1021, 0x0000, 0x0000, false, false),
                    new CRC(32, "CRC32", 0x04C11DB7, 0xFFFFFFFF, 0xFFFFFFFF, true, true),
                    new CRC(32, "CRC32_BZIP2", 0x04C11DB7, 0xFFFFFFFF, 0xFFFFFFFF, false, false),
                    new CRC(32, "CRC32_C", 0x1EDC6F41, 0xFFFFFFFF, 0xFFFFFFFF, true, true),
                    new CRC(32, "CRC32_D", 0xA833982B, 0xFFFFFFFF, 0xFFFFFFFF, true, true),
                    new CRC(32, "CRC32_MPEG2", 0x04C11DB7, 0xFFFFFFFF, 0x00000000, false, false),
                    new CRC(32, "CRC32_POSIX", 0x04C11DB7, 0x00000000, 0xFFFFFFFF, false, false),
                    new CRC(32, "CRC32_Q", 0x814141AB, 0x00000000, 0x00000000, false, false),
                    new CRC(32, "CRC32_JAMCRC", 0x04C11DB7, 0xFFFFFFFF, 0x00000000, true, true),
                    new CRC(32, "CRC32_XFER", 0x000000AF, 0x00000000, 0x00000000, false, false)
                ];
            }
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    CRC.prototype.makeCrcTable = function () {
        this._crcTable = new Array(256);
        for (var divident = 0; divident < 256; divident++) {
            var currByte = (divident << (this._width - 8)) & this._castMask;
            for (var bit = 0; bit < 8; bit++) {
                if ((currByte & this._msbMask) != 0) {
                    currByte <<= 1;
                    currByte ^= this._polynomial;
                }
                else {
                    currByte <<= 1;
                }
            }
            this._crcTable[divident] = (currByte & this._castMask);
        }
    };
    CRC.prototype.makeCrcTableReversed = function () {
        this._crcTable = new Array(256);
        for (var divident = 0; divident < 256; divident++) {
            var reflectedDivident = crcUtil_1.default.Reflect8(divident);
            var currByte = (reflectedDivident << (this._width - 8)) & this._castMask;
            for (var bit = 0; bit < 8; bit++) {
                if ((currByte & this._msbMask) != 0) {
                    currByte <<= 1;
                    currByte ^= this._polynomial;
                }
                else {
                    currByte <<= 1;
                }
            }
            currByte = crcUtil_1.default.ReflectGeneric(currByte, this.width);
            this._crcTable[divident] = (currByte & this._castMask);
        }
    };
    CRC.prototype.compute = function (bytes) {
        if (!this._crcTable)
            this.makeCrcTable();
        var crc = this._initialVal;
        for (var i = 0; i < bytes.length; i++) {
            var curByte = bytes[i] & 0xFF;
            if (this.inputReflected) {
                curByte = crcUtil_1.default.Reflect8(curByte);
            }
            crc = (crc ^ (curByte << (this._width - 8))) & this._castMask;
            var pos = (crc >> (this.width - 8)) & 0xFF;
            crc = (crc << 8) & this._castMask;
            crc = (crc ^ this._crcTable[pos]) & this._castMask;
        }
        if (this.resultReflected) {
            crc = crcUtil_1.default.ReflectGeneric(crc, this.width);
        }
        return ((crc ^ this._finalXorVal) & this._castMask);
    };
    Object.defineProperty(CRC.prototype, "table", {
        get: function () {
            return this._crcTable;
        },
        enumerable: true,
        configurable: true
    });
    return CRC;
}());
exports.default = CRC;
//# sourceMappingURL=crc.js.map