import { Config } from "./config";

export enum Opcode {
    Set,
    Get,
    Info,
};

export interface Message {
    opcode:Opcode
    tabID:number
    payload:string
};

export function MsgBuilder(opcode:Opcode, tabID:number, payload?:string | Config):Message {
    let msg:Message = {
        opcode: opcode,
        tabID: tabID,
        payload: "",
    };

    if (typeof payload === "undefined") {
        payload = "";
    } else if (payload instanceof Config) {
        payload = payload.serialize();
    }
    msg.payload = payload;

    return msg;
}
