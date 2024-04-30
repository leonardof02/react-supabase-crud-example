

import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = "https://ekwihyfhnujyrydxtxbl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrd2loeWZobnVqeXJ5ZHh0eGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MDk1NDEsImV4cCI6MjAyOTk4NTU0MX0.xftMpl14db_yMDWuuwMBrUwpvTMI5ixdyG1crnxD94w";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
