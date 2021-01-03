/// <reference types="express-serve-static-core" />
import express from 'express';
import { GameReference } from './model';
export declare const hackbox: ({ app, port, isSecure }: {
    app: express.Express;
    port: string | number;
    isSecure: boolean;
}, gameReference: GameReference) => void;
//# sourceMappingURL=index.d.ts.map