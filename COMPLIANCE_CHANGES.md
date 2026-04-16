# Google Ads Compliance Updates - PassaporteExpress

## Overview
This document outlines all changes made to comply with Google Ads policies for "Serviços Oficiais e Documentos do Governo" category. All changes address the specific compliance violations identified in the Google Ads review report.

## Changes Implemented

### 1. **Disclaimer Banner (Above the Fold)** ✅
- **Location**: Fixed banner at the top of the page
- **Content**: "⚠️ AVISO IMPORTANTE: Somos uma empresa privada de assessoria e NÃO temos vínculo com a Polícia Federal ou órgãos do governo. Cobramos uma taxa de serviço para auxiliar no seu processo."
- **Styling**: Red background (#dc2626) with white text for high visibility
- **Dismissible**: Users can close the banner with a button
- **Mobile**: Responsive and visible on all screen sizes
- **Compliance Goal**: Makes it immediately clear this is NOT a government website

### 2. **Updated Hero Section Title** ✅
- **Before**: "Solicite seu Passaporte de Forma Simples e Rapida"
- **After**: "Assessoria Especializada para Solicitação de Passaporte"
- **Purpose**: Shifts focus from "getting a passport" to "advisory service assistance"
- **Impact**: Prevents users from thinking this IS an official service

### 3. **Enhanced Hero Description** ✅
- **Added Clarification**: "Somos uma empresa privada que oferece serviço de assessoria para auxiliá-lo no processo de solicitação do seu passaporte. Você também pode realizar este processo de forma independente e gratuita diretamente no site oficial da Polícia Federal."
- **Purpose**: Makes the free alternative immediately visible to users

### 4. **Transparent Pricing Breakdown** ✅
- **Previous Issue**: Prices looked like government fees
- **Solution**: Now shows three separate components for each option:
  - **Taxa de Assessoria** (Advisory Fee): Our private service charge
  - **Taxa do Governo (GRU)** (Government Fee): Official government charge
  - **Total**: Sum of both
- **Information Box**: Added explanation that GRU is mandatory and paid directly to government
- **Example for "Passaporte Comum"**:
  - Taxa de Assessoria: R$ 150,00
  - Taxa do Governo (GRU): R$ 257,25
  - **Total: R$ 407,25**

### 5. **Link to Official Government Portal** ✅
- **Location 1**: Below the main CTA button in hero section
- **Location 2**: In the footer under "Serviços" section
- **Text**: "Acesse o portal oficial da Polícia Federal"
- **Link**: https://www.gov.br/servicos/passaporte
- **Opens**: In new tab (target="_blank")
- **Purpose**: Makes it clear users can do this process completely free through official channels

### 6. **Updated FAQ Section** ✅
- **New Question**: "Este é um site oficial do governo?"
  - Answer emphasizes: NOT official, NOT linked to Police Federal
- **New Question**: "Posso fazer isso gratuitamente?"
  - Answer explains: YES, completely free through official portal
- **New Question**: "Qual a diferença entre sua taxa e a taxa do governo?"
  - Answer clarifies: GRU is mandatory for everyone, our fee is optional for advisory service

### 7. **Updated Terms of Use** ✅
- **Section 2 (Service Description)**: Added "Este serviço tem caráter orientativo e não substitui os canais oficiais do governo"
- **Section 5 (Payments)**: Clarified that government taxes are separate from advisory fees

### 8. **Privacy Policy Updates** ✅
- Added explicit clause about government data separation
- Clarified data security measures
- Added contact email for privacy concerns

## Compliance Mapping

| Violation | Resolution | Status |
|-----------|-----------|--------|
| **Lack of clear distinction** | Disclaimer banner + updated title + new FAQ | ✅ Fixed |
| **Ambiguous pricing** | Transparent breakdown with GRU separate | ✅ Fixed |
| **No visible disclaimer** | Red banner above the fold | ✅ Fixed |
| **Missing free alternative** | Multiple links to official portal | ✅ Fixed |
| **Visual ambiguity** | Clearer messaging in hero and throughout | ✅ Fixed |

## Next Steps for Submission

1. **Deploy Changes**: Upload updated index.html to production
2. **Verify**: Test that:
   - Disclaimer banner appears immediately on page load
   - Links to gov.br open correctly
   - Mobile responsiveness works
   - All new text displays properly
3. **Request New Review**: Submit site for Google Ads compliance review
4. **Certification**: Apply for "Government Services Certification" in Google Ads account settings if required

## Key Messaging Points

The site now clearly communicates:
- ✅ We are a PRIVATE company (not government)
- ✅ We charge a fee for ADVISORY SERVICES (not for the passport itself)
- ✅ Users can do this completely FREE through official channels
- ✅ Government fees are separate from our service fees
- ✅ All information is clearly visible above the fold

## File Modified
- `/vercel/share/v0-project/index.html` - All changes made in this file

## Compliance Report Date
- Report Date: Relatório de Conformidade (March 2026)
- Implementation Date: April 2026
