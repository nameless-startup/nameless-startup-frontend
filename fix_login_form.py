import re

with open('src/app/login/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Change mb-8 to mb-6
content = content.replace('text-center mb-8', 'text-center mb-6')

# Fix 2: Move "بازگشت به صفحه اصلی" from top to bottom of form
old_login_form = '''            </form>
          )}

        
          {/* Signup Form */}'''

new_login_form = '''            </form>
            <div className="text-center mt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-violet-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </div>
        )}

        
          {/* Signup Form */}'''

if old_login_form in content:
    content = content.replace(old_login_form, new_login_form)
    print('Fixed login form structure')
else:
    print('Could not find login form structure')
    # Try to find what's there
    import re
    match = re.search(r'</form>.*?Signup Form', content)
    if match:
        print('Found:', match.group(0)[:200])

with open('src/app/login/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
