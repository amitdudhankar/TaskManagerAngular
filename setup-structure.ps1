Write-Host "Setting up Angular Task Manager App structure..."

# Navigate to src\app
Set-Location -Path "src\app"

# 1. Auth Module
ng g c auth/login --skip-tests
ng g c auth/signup --skip-tests
ng g s auth/auth --skip-tests

# 2. Core Module
ng g guard core/guards/auth --skip-tests
New-Item -ItemType Directory -Path "core/interceptors" -Force | Out-Null

# 3. Tasks Module
ng g c tasks/task-list --skip-tests
ng g c tasks/task-form --skip-tests
ng g s tasks/task --skip-tests

# 4. Shared Module
New-Item -ItemType Directory -Path "shared/models" -Force | Out-Null
New-Item -ItemType Directory -Path "shared/components" -Force | Out-Null
New-Item -ItemType Directory -Path "shared/utils" -Force | Out-Null

# 5. App Routing Module (only if not already present)
ng g module app-routing --flat --module=app

Write-Host ""
Write-Host "Structure setup completed successfully!"
