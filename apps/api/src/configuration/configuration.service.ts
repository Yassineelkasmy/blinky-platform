import { ZodObject, ZodRawShape } from 'zod';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService<T> {
    private readonly data: T;

    constructor(
        private readonly schema: ZodObject<ZodRawShape>,
        private readonly source: Record<string, unknown> = process.env,
    ) {
        this.data = this.validate(this.source);
    }

    validate(source: Record<string, unknown>): T {
        const validatedSource = this.schema.safeParse(source);

        if (validatedSource.success === false) {
            throw new Error(validatedSource.error.message);
        }

        return validatedSource.data as T;
    }

    get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }
}