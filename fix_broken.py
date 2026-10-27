import re

with open('src/app/login/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Remove the broken {* Form Step *} and extra </div>
old_broken = '''{/* Form Step */}
</div>
             <form onSubmit={handleCredentialsSubmit} className="space-y-4">'''

# The space before <form may vary, let's try a more flexible pattern
import re
old_broken_pattern = r'\{/\* Form Step \*/\}\s*</div>\s*<form onSubmit=\{handleCredentialsSubmit\} className="space-y-4">'

if old_broken in content:
    content = content.replace(old_broken, '\n        {mode === "login" && !isInOtpStep && (\n          <form onSubmit={handleCredentialsSubmit} className="space-y-4">')
    print('Fixed with exact match')
else:
    # Try with regex
    new_content, count = re.subn(old_broken_pattern, 
        '\\n        {mode === "login" && !isInOtpStep && (\n          <form onSubmit={handleCredentialsSubmit} className="space-y-4">', 
        content)
    if count > 0:
        content = new_content
        print('Fixed with regex, count:', count)
    else:
        print('Could not find broken pattern')
        # Show what we have around line 230
        lines = content.split('\n')
        for i in range(228, 235):
            if i < len(lines):
                print(f'Line {i+1}: {lines[i]}')

with open('src/app/login/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
