import { createClient } from '@supabase/supabase-js'

// 把你剛才複製的內容貼到下面這兩行
const supabaseUrl = 'https://gcgxmmajmrrdmrtksile.supabase.co'
const supabaseKey = 'sb_publishable_M5wDj8kfXN5rU3Bd7pyvdQ_U0aQtcKi'

export const supabase = createClient(supabaseUrl, supabaseKey)