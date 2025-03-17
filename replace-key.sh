#!/bin/bash
git filter-branch -f --tree-filter '
if [ -f Backend/config/settings.py ]; then
    sed -i "s/django-insecure-\$b-v%6zh\!gr7z=e3vryc%\$j_2@m=qlx0d_h\*t)8z=re9%=_m)m/REMOVED_FOR_SECURITY/g" Backend/config/settings.py
fi' HEAD
