import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ehshqfkrdezirzygzeni.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoc2hxZmtyZGV6aXJ6eWd6ZW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxOTE5OTEsImV4cCI6MjA3Mjc2Nzk5MX0.AzMjipWPS4K84NpUMn2fA8pdkJRm74-NFo5YixbdU50'
export const supabase = createClient(supabaseUrl, supabaseKey)
