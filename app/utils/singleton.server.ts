// Borrowed & modified from https://github.com/jenseng/abuse-the-platform/blob/main/app/utils/singleton.ts

export const singleton = <Value>(
	name: string,
	valueFactory: () => Value
): Value => {
	const g = global as any;
	g.__singletons ??= {};
	g.__singletons[name] ??= valueFactory();
	return g.__singletons[name];
};

export function OptionalSingleton<T>(name: string) {
	const g = global as any;
	return g.__singletons[name] as T | undefined;
}

export function DemolishSingleton (name: string) {
	const g = global as any;
	g.__singletons[name] = undefined;
}