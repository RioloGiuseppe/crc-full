import CrcUtil from './crcUtil';

export class CRC {

    private _width : number;
    private _name : string;
    private _polynomial : number;
    private _initialVal : number;
    private _finalXorVal : number;
    private _inputReflected : boolean;
    private _resultReflected : boolean;
    private static _list : CRC[];

    private _crcTable : number[];
    private _castMask : number;
    private _msbMask : number

    public get width() : number {return this._width;}
    public set width(v : number) {
        this._width = v;
    }

    public get name() : string {return this._name;}
    public set name(v : string) {
        this._name = v;
    }

    public get polynomial() : number {return this._polynomial;}
    public set polynomial(v : number) {
        this._polynomial = v;
    }

    public get initial() : number {return this._initialVal;}
    public set initial(v : number) {
        this._initialVal = v;
    }

    public get finalXor() : number {return this._finalXorVal;}
    public set finalXor(v : number) {
        this._finalXorVal = v;
    }

    public get inputReflected() : boolean {return this._inputReflected;}
    public set inputReflected(v : boolean) {
        this._inputReflected = v;
    }

    public get resultReflected() : boolean {return this._resultReflected;}
    public set resultReflected(v : boolean) {
        this._resultReflected = v;
    }

    constructor(width : number, name : string, polynomial : number, initial : number, finalXor : number, inputReflected : boolean, resultReflected : boolean) {
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
        this._msbMask = 0x01 << (this._width - 1)
    }

    public static get defaults() : CRC[] {
        if (!this._list) {
            this._list = new Array();
            this
                ._list
                .push(new CRC(8, "CRC8", 0x07, 0x00, 0x00, false, false));
            this
                ._list
                .push(new CRC(8, "CRC8_SAE_J1850", 0x1D, 0xFF, 0xFF, false, false));
            this
                ._list
                .push(new CRC(8, "CRC8_SAE_J1850_ZERO", 0x1D, 0x00, 0x00, false, false));
            this
                ._list
                .push(new CRC(8, "CRC8_8H2F", 0x2F, 0xFF, 0xFF, false, false));
            this
                ._list
                .push(new CRC(8, "CRC8_CDMA2000", 0x9B, 0xFF, 0x00, false, false));
            this
                ._list
                .push(new CRC(8, "CRC8_DARC", 0x39, 0x00, 0x00, true, true));
            this
                ._list
                .push(new CRC(8, "CRC8_DVB_S2", 0xD5, 0x00, 0x00, false, false));
            this
                ._list
                .push(new CRC(8, "CRC8_EBU", 0x1D, 0xFF, 0x00, true, true));
            this
                ._list
                .push(new CRC(8, "CRC8_ICODE", 0x1D, 0xFD, 0x00, false, false));
            this
                ._list
                .push(new CRC(8, "CRC8_ITU", 0x07, 0x00, 0x55, false, false));
            this
                ._list
                .push(new CRC(8, "CRC8_MAXIM", 0x31, 0x00, 0x00, true, true));
            this
                ._list
                .push(new CRC(8, "CRC8_ROHC", 0x07, 0xFF, 0x00, true, true));
            this
                ._list
                .push(new CRC(8, "CRC8_WCDMA", 0x9B, 0x00, 0x00, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_CCIT_ZERO", 0x1021, 0x0000, 0x0000, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_ARC", 0x8005, 0x0000, 0x0000, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_AUG_CCITT", 0x1021, 0x1D0F, 0x0000, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_BUYPASS", 0x8005, 0x0000, 0x0000, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_CCITT_FALSE", 0x1021, 0xFFFF, 0x0000, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_CDMA2000", 0xC867, 0xFFFF, 0x0000, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_DDS_110", 0x8005, 0x800D, 0x0000, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_DECT_R", 0x0589, 0x0000, 0x0001, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_DECT_X", 0x0589, 0x0000, 0x0000, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_DNP", 0x3D65, 0x0000, 0xFFFF, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_EN_13757", 0x3D65, 0x0000, 0xFFFF, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_GENIBUS", 0x1021, 0xFFFF, 0xFFFF, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_MAXIM", 0x8005, 0x0000, 0xFFFF, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_MCRF4XX", 0x1021, 0xFFFF, 0x0000, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_RIELLO", 0x1021, 0xB2AA, 0x0000, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_T10_DIF", 0x8BB7, 0x0000, 0x0000, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_TELEDISK", 0xA097, 0x0000, 0x0000, false, false));
            this
                ._list
                .push(new CRC(16, "CRC16_TMS37157", 0x1021, 0x89EC, 0x0000, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_USB", 0x8005, 0xFFFF, 0xFFFF, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_A", 0x1021, 0xC6C6, 0x0000, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_KERMIT", 0x1021, 0x0000, 0x0000, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_MODBUS", 0x8005, 0xFFFF, 0x0000, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_X_25", 0x1021, 0xFFFF, 0xFFFF, true, true));
            this
                ._list
                .push(new CRC(16, "CRC16_XMODEM", 0x1021, 0x0000, 0x0000, false, false));
            this
                ._list
                .push(new CRC(32, "CRC32", 0x04C11DB7, 0xFFFFFFFF, 0xFFFFFFFF, true, true));
            this
                ._list
                .push(new CRC(32, "CRC32_BZIP2", 0x04C11DB7, 0xFFFFFFFF, 0xFFFFFFFF, false, false));
            this
                ._list
                .push(new CRC(32, "CRC32_C", 0x1EDC6F41, 0xFFFFFFFF, 0xFFFFFFFF, true, true));
            this
                ._list
                .push(new CRC(32, "CRC32_D", 0xA833982B, 0xFFFFFFFF, 0xFFFFFFFF, true, true));
            this
                ._list
                .push(new CRC(32, "CRC32_MPEG2", 0x04C11DB7, 0xFFFFFFFF, 0x00000000, false, false));
            this
                ._list
                .push(new CRC(32, "CRC32_POSIX", 0x04C11DB7, 0x00000000, 0xFFFFFFFF, false, false));
            this
                ._list
                .push(new CRC(32, "CRC32_Q", 0x814141AB, 0x00000000, 0x00000000, false, false));
            this
                ._list
                .push(new CRC(32, "CRC32_JAMCRC", 0x04C11DB7, 0xFFFFFFFF, 0x00000000, true, true));
            this
                ._list
                .push(new CRC(32, "CRC32_XFER", 0x000000AF, 0x00000000, 0x00000000, false, false));
        }
        return this._list;
    }

    public makeCrcTable() {
        this._crcTable = new Array(256);

        for (var divident = 0; divident < 256; divident++) {
            var currByte = (divident << (this._width - 8)) & this._castMask;
            for (var bit = 0; bit < 8; bit++) {
                if ((currByte & this._msbMask) != 0) {
                    currByte <<= 1;
                    currByte ^= this._polynomial;
                } else {
                    currByte <<= 1;
                }
            }
            this._crcTable[divident] = (currByte & this._castMask);
        }
    }

    public makeCrcTableReversed() {
        this._crcTable = new Array(256);

        for (var divident = 0; divident < 256; divident++) {
            var reflectedDivident = CrcUtil.Reflect8(divident);

            var currByte = (reflectedDivident << (this._width - 8)) & this._castMask;

            for (var bit = 0; bit < 8; bit++) {
                if ((currByte & this._msbMask) != 0) {
                    currByte <<= 1;
                    currByte ^= this._polynomial;
                } else {
                    currByte <<= 1;
                }
            }

            currByte = CrcUtil.ReflectGeneric(currByte, this.width);

            this._crcTable[divident] = (currByte & this._castMask);
        }
    }

    public compute(bytes : number[]) {
        if (!this._crcTable) 
            this.makeCrcTable();        
        var crc = this._initialVal;
        for (var i = 0; i < bytes.length; i++) {

            var curByte = bytes[i] & 0xFF;

            if (this.inputReflected) {
                curByte = CrcUtil.Reflect8(curByte);
            }

            /* update the MSB of crc value with next input byte */
            crc = (crc ^ (curByte << (this._width - 8))) & this._castMask;
            /* this MSB byte value is the index into the lookup table */
            var pos = (crc >> (this.width - 8)) & 0xFF;
            /* shift out this index */
            crc = (crc << 8) & this._castMask;
            /* XOR-in remainder from lookup table using the calculated index */
            crc = (crc ^ this._crcTable[pos]) & this._castMask;
        }

        if (this.resultReflected) {
            crc = CrcUtil.ReflectGeneric(crc, this.width);
        }
        return ((crc ^ this._finalXorVal) & this._castMask);
    }

    public get table() {
        return this._crcTable;
    }

}