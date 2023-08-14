export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[];

export interface Database {
	public: {
		Tables: {
			users: {
				Row: {
					content: string;
					created_at: string;
					id: number;
					user_id: string | null;
				};
				Insert: {
					content: string;
					created_at?: string;
					id?: number;
					user_id?: string | null;
				};
				Update: {
					content?: string;
					created_at?: string;
					id?: number;
					user_id?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
