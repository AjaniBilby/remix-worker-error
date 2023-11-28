import { execSync } from 'node:child_process';

export const COMMIT = execSync("git rev-parse HEAD").toString().trim();
export const MODE = process.env.NODE_ENV;