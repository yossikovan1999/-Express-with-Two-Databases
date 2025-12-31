import { createClient } from "@supabase/supabase-js";

import "dotenv/config";

const URL = process.env.SUPABASE_URL;
const API_KEY = process.env.SUPABASE_PRIVATE_API_KEY;

const supabase = createClient(URL, API_KEY);

export default supabase;
