declare const dotProp: {
	delete: (obj: any, prop: number | string) => any;
	set: (obj: any, prop: number | string, value: any) => any;
	get: (obj: any, prop: string | string[] | number, value?: any) => any;
	toggle: (obj: any, prop: number | string) => any;
	merge: (obj: any, prop: number | string, val: any) => any;
}

export = dotProp;