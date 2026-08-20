"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\nenum UserRole {\n  ADMIN\n  USER\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel User {\n  id        Int      @id @default(autoincrement())\n  name      String\n  email     String   @unique\n  password  String\n  role      UserRole @default(USER)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  refreshTokens RefreshToken[]\n}\n\nmodel RefreshToken {\n  id          Int      @id @default(autoincrement())\n  hashedToken String   @unique\n  expiresAt   DateTime\n  createdAt   DateTime @default(now())\n\n  deviceName String?\n  ipAddress  String?\n  userAgent  String?\n\n  userId Int\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"UserRole\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"refreshTokens\",\"kind\":\"object\",\"type\":\"RefreshToken\",\"relationName\":\"RefreshTokenToUser\"}],\"dbName\":null},\"RefreshToken\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"hashedToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"deviceName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ipAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"RefreshTokenToUser\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"user\",\"refreshTokens\",\"_count\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"RefreshToken.findUnique\",\"RefreshToken.findUniqueOrThrow\",\"RefreshToken.findFirst\",\"RefreshToken.findFirstOrThrow\",\"RefreshToken.findMany\",\"RefreshToken.createOne\",\"RefreshToken.createMany\",\"RefreshToken.createManyAndReturn\",\"RefreshToken.updateOne\",\"RefreshToken.updateMany\",\"RefreshToken.updateManyAndReturn\",\"RefreshToken.upsertOne\",\"RefreshToken.deleteOne\",\"RefreshToken.deleteMany\",\"RefreshToken.groupBy\",\"RefreshToken.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"hashedToken\",\"expiresAt\",\"createdAt\",\"deviceName\",\"ipAddress\",\"userAgent\",\"userId\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"not\",\"name\",\"email\",\"password\",\"UserRole\",\"role\",\"updatedAt\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "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-ACAaAAA_ACAbAAA_ACA5QAAAAAE6QAAAAAQ7QAAAAAQ8QAAAAAE9QAAAAAE-QAAAAAE_QAAAAAFDQAA9ACEOBQAAOwAgGgAAPAAgGwAAPAAgOQEAAAABOgEAAAAFOwEAAAAFPAEAAAABPQEAAAABPgEAAAABPwEAAAABQAEAAAABQQEAAAABQgEAAAABQwEAOgAhDgUAADsAIBoAADwAIBsAADwAIDkBAAAAAToBAAAABTsBAAAABTwBAAAAAT0BAAAAAT4BAAAAAT8BAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBADoAIQg5AgAAAAE6AgAAAAU7AgAAAAU8AgAAAAE9AgAAAAE-AgAAAAE_AgAAAAFDAgA7ACELOQEAAAABOgEAAAAFOwEAAAAFPAEAAAABPQEAAAABPgEAAAABPwEAAAABQAEAAAABQQEAAAABQgEAAAABQwEAPAAhCwUAAD4AIBoAAD8AIBsAAD8AIDlAAAAAATpAAAAABDtAAAAABDxAAAAAAT1AAAAAAT5AAAAAAT9AAAAAAUNAAD0AIQg5AgAAAAE6AgAAAAQ7AgAAAAQ8AgAAAAE9AgAAAAE-AgAAAAE_AgAAAAFDAgA-ACEIOUAAAAABOkAAAAAEO0AAAAAEPEAAAAABPUAAAAABPkAAAAABP0AAAAABQ0AAPwAhDgUAAD4AIBoAAEEAIBsAAEEAIDkBAAAAAToBAAAABDsBAAAABDwBAAAAAT0BAAAAAT4BAAAAAT8BAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBAEAAIQs5AQAAAAE6AQAAAAQ7AQAAAAQ8AQAAAAE9AQAAAAE-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQBBACENBQAAPgAgGAAAQwAgGQAAPgAgGgAAPgAgGwAAPgAgOQIAAAABOgIAAAAEOwIAAAAEPAIAAAABPQIAAAABPgIAAAABPwIAAAABQwIAQgAhCDkIAAAAAToIAAAABDsIAAAABDwIAAAAAT0IAAAAAT4IAAAAAT8IAAAAAUMIAEMAIQouAABEADAvAAAcABAwAABEADAxAgA2ACE0QAA4ACFEAQA3ACFFAQA3ACFGAQA3ACFIAABFSCJJQAA4ACEHBQAAPgAgGgAARwAgGwAARwAgOQAAAEgCOgAAAEgIOwAAAEgIQwAARkgiBwUAAD4AIBoAAEcAIBsAAEcAIDkAAABIAjoAAABICDsAAABICEMAAEZIIgQ5AAAASAI6AAAASAg7AAAASAhDAABHSCILBAAATQAgLgAASAAwLwAACQAQMAAASAAwMQIASQAhNEAATAAhRAEASgAhRQEASgAhRgEASgAhSAAAS0giSUAATAAhCDkCAAAAAToCAAAABDsCAAAABDwCAAAAAT0CAAAAAT4CAAAAAT8CAAAAAUMCAD4AIQs5AQAAAAE6AQAAAAQ7AQAAAAQ8AQAAAAE9AQAAAAE-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQBBACEEOQAAAEgCOgAAAEgIOwAAAEgIQwAAR0giCDlAAAAAATpAAAAABDtAAAAABDxAAAAAAT1AAAAAAT5AAAAAAT9AAAAAAUNAAD8AIQNKAAADACBLAAADACBMAAADACAMAwAAUAAgLgAATgAwLwAAAwAQMAAATgAwMQIASQAhMgEASgAhM0AATAAhNEAATAAhNQEATwAhNgEATwAhNwEATwAhOAIASQAhCzkBAAAAAToBAAAABTsBAAAABTwBAAAAAT0BAAAAAT4BAAAAAT8BAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBADwAIQ0EAABNACAuAABIADAvAAAJABAwAABIADAxAgBJACE0QABMACFEAQBKACFFAQBKACFGAQBKACFIAABLSCJJQABMACFNAAAJACBOAAAJACAAAAAAAAABUgEAAAABAVJAAAAAAQFSAQAAAAEFUgIAAAABWAIAAAABWQIAAAABWgIAAAABWwIAAAABBRIAAHQAIBMAAHcAIE8AAHUAIFAAAHYAIFUAAAEAIAMSAAB0ACBPAAB1ACBVAAABACAAAAAAAAFSAAAASAILEgAAZAAwEwAAaQAwTwAAZQAwUAAAZgAwUQAAZwAgUgAAaAAwUwAAaAAwVAAAaAAwVQAAaAAwVgAAagAwVwAAawAwBzECAAAAATIBAAAAATNAAAAAATRAAAAAATUBAAAAATYBAAAAATcBAAAAAQIAAAAFACASAABvACADAAAABQAgEgAAbwAgEwAAbgAgAQsAAHMAMAwDAABQACAuAABOADAvAAADABAwAABOADAxAgAAAAEyAQAAAAEzQABMACE0QABMACE1AQBPACE2AQBPACE3AQBPACE4AgBJACECAAAABQAgCwAAbgAgAgAAAGwAIAsAAG0AIAsuAABrADAvAABsABAwAABrADAxAgBJACEyAQBKACEzQABMACE0QABMACE1AQBPACE2AQBPACE3AQBPACE4AgBJACELLgAAawAwLwAAbAAQMAAAawAwMQIASQAhMgEASgAhM0AATAAhNEAATAAhNQEATwAhNgEATwAhNwEATwAhOAIASQAhBzECAFoAITIBAFcAITNAAFgAITRAAFgAITUBAFkAITYBAFkAITcBAFkAIQcxAgBaACEyAQBXACEzQABYACE0QABYACE1AQBZACE2AQBZACE3AQBZACEHMQIAAAABMgEAAAABM0AAAAABNEAAAAABNQEAAAABNgEAAAABNwEAAAABBBIAAGQAME8AAGUAMFEAAGcAIFUAAGgAMAABBAAAcQAgBzECAAAAATIBAAAAATNAAAAAATRAAAAAATUBAAAAATYBAAAAATcBAAAAAQcxAgAAAAE0QAAAAAFEAQAAAAFFAQAAAAFGAQAAAAFIAAAASAJJQAAAAAECAAAAAQAgEgAAdAAgAwAAAAkAIBIAAHQAIBMAAHgAIAkAAAAJACALAAB4ACAxAgBaACE0QABYACFEAQBXACFFAQBXACFGAQBXACFIAABiSCJJQABYACEHMQIAWgAhNEAAWAAhRAEAVwAhRQEAVwAhRgEAVwAhSAAAYkgiSUAAWAAhAgQGAgUAAwEDAAEBBAcAAAAABQUACBgACRkAChoACxsADAAAAAAABQUACBgACRkAChoACxsADAEDAAEBAwABBQUAERgAEhkAExoAFBsAFQAAAAAABQUAERgAEhkAExoAFBsAFQYCAQcIAQgLAQkMAQoNAQwPAQ0RBA4SBQ8UARAWBBEXBhQYARUZARYaBBwdBx0eDR4fAh8gAiAhAiEiAiIjAiMlAiQnBCUoDiYqAicsBCgtDykuAiovAiswBCwzEC00Fg"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => __importStar(require('node:buffer')));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"))),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js")));
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map