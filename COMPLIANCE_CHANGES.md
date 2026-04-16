# Google Ads Compliance Updates - PassaporteExpress

## Overview
This document outlines all changes made to comply with Google Ads policies for "Serviços Oficiais e Documentos do Governo" category. All changes address the specific compliance violations identified in the Google Ads review report.

## Changes Implemented

### 1. **Disclaimer Banner (Above the Fold)** 
- **Location**: Fixed banner at the top of the page
- **Content**: "Este site não faz parte do Google LLC ou do Facebook Inc. e não oferecemos nenhum tipo de documento ou serviço do governo. Somos uma agência de turismo especializada em desembaraço de documentos para viagens, contando com assessoria jurídica para casos específicos."
- **Styling**: Professional blue gradient background (#1e3a5f to #2d4a6f) with white text
- **Dismissible**: Users can close the banner with a button
- **Mobile**: Responsive and visible on all screen sizes
- **Compliance Goal**: Makes it immediately clear this is NOT a government website

### 2. **Updated Hero Section Title**
- **Before**: "Solicite seu Passaporte de Forma Simples e Rapida"
- **After**: "Assessoria Especializada para Solicitação de Passaporte"
- **Purpose**: Shifts focus from "getting a passport" to "advisory service assistance"
- **Impact**: Prevents users from thinking this IS an official service

### 3. **Enhanced Hero Description**
- **Added Clarification**: "Somos uma empresa privada que oferece serviço de assessoria para auxiliá-lo no processo de solicitação do seu passaporte. Você também pode realizar este processo de forma independente e gratuita diretamente no site oficial da Polícia Federal."
- **Purpose**: Makes the free alternative immediately visible to users

### 4. **"Service Notice" Section (New)**
- **Location**: Above pricing section
- **Headline**: "Este é um serviço opcional e privado!"
- **Content**: Clear statement that we are not the Polícia Federal or any government agency
- **Link**: Direct link to official government portal for free alternative
- **Styling**: Blue gradient background matching the disclaimer banner

### 5. **Transparent Pricing Breakdown**
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

### 6. **Link to Official Government Portal**
- **Location 1**: Below the main CTA button in hero section
- **Location 2**: In the footer under "Serviços" section
- **Location 3**: In the service notice section
- **Location 4**: In the footer disclaimer
- **Text**: "Acesse o portal oficial da Polícia Federal"
- **Link**: https://www.gov.br/servicos/passaporte
- **Opens**: In new tab (target="_blank")
- **Purpose**: Makes it clear users can do this process completely free through official channels

### 7. **Updated FAQ Section (Expanded)**
- **New Question**: "Este é um site oficial do governo?"
  - Answer emphasizes: NOT official, NOT linked to Police Federal
- **New Question**: "Posso fazer isso gratuitamente?"
  - Answer explains: YES, completely free through official portal
- **New Question**: "Qual a diferença entre sua taxa e a taxa do governo?"
  - Answer clarifies: GRU is mandatory for everyone, our fee is optional for advisory service
- **New Question**: "Essa atividade de assessoria é legal?"
  - Answer explains: YES! Regulated by Lei nº 11.771/2008 and Lei nº 12.974/2014
  - References Art. 27 allowing agencies to obtain passports and documents
- **New Question**: "Vocês são a Polícia Federal ou órgão do governo?"
  - Answer: Clear NO with explanation and link to official portal

### 8. **Footer Legal Disclaimer (New)**
- **Location**: Above footer bottom section
- **Content**: Complete legal disclaimer including:
  - Statement that site is not part of Google LLC, Facebook Inc., or government
  - Description as tourism agency specialized in travel document processing
  - Legal basis: Lei nº 11.771/2008 and Lei nº 12.974/2014
  - Link to official government portal for free alternative

## Compliance Mapping

| Violation | Resolution | Status |
|-----------|-----------|--------|
| **Lack of clear distinction** | Multiple disclaimer banners + updated title + expanded FAQ + legal footer | Fixed |
| **Ambiguous pricing** | Transparent breakdown with GRU separate | Fixed |
| **No visible disclaimer** | Blue banner above the fold + service notice section | Fixed |
| **Missing free alternative** | 4+ links to official portal throughout the site | Fixed |
| **Visual ambiguity** | Clearer messaging in hero and throughout | Fixed |
| **No legal basis shown** | Added Lei references in FAQ and footer | Fixed |

## Inspiration from Competitor
Changes inspired by best practices from https://www.passaporteeviagens.tur.br/:
- Clear "Este é um serviço opcional e privado!" messaging
- Legal basis with Law references (11.771/2008 and 12.974/2014)
- Professional disclaimer wording about Google LLC and Facebook Inc.
- Tourism agency identification

## Key Messaging Points

The site now clearly communicates:
- We are a PRIVATE company (not government)
- We are NOT part of Google LLC, Facebook Inc., or government agencies
- We are a tourism agency specialized in travel document processing
- We charge a fee for ADVISORY SERVICES (not for the passport itself)
- Users can do this completely FREE through official channels
- Government fees are separate from our service fees
- Our activity is legally regulated by Brazilian law
- All information is clearly visible above the fold

## Files Modified
- `/vercel/share/v0-project/index.html` - Main landing page with all compliance changes
- `/vercel/share/v0-project/COMPLIANCE_CHANGES.md` - This documentation file

## Compliance Report Date
- Report Date: Relatório de Conformidade (March 2026)
- Implementation Date: April 2026
