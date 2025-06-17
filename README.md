# BeachBus

Beachbus is a transportation initiative designed to serve tourists and guests of hotels and resorts in El Nido, Palawan. The core idea is to operate a closed-loop bus system that connects a network of partner accommodations through fixed routes. Instead of traditional tickets or fares, Beachbus will issue NFC-enabled access passes. These passes grant unlimited rides for a specified duration (1, 3, or 5 days), providing a seamless, cashless, and hassle-free experience for tourists.

The system is designed to improve the coordination of shuttle services between partner establishments and to optimize transport efficiency in a tourism-heavy area.

## Objectives

1. Replace single-ride tickets with **unlimited-period access passes**.
2. **Track** usage data for analytics and scheduling adjustments.
3. Provide **frictionless boarding process**.
4. Ensure a system that is **easy to maintain**, **secure**, and **adaptable** for future expansion.

## Target Users
1. **Tourists**: regular pass holders for their transportation needs
2. **Hotel Employees**: employee pass holders for limited daily transportation

## System Overview

### Key Features
- time-based passes, with flexible activation time (first use instead of upon purchase)
- analytics for effective tracking of card lifecycle
- fast remote verification processes for efficient shareholder transactions

### Specifications

- **Language**: JavaScript (Apps Script), HTML/CSS
- **Storage**: Google Sheets (temporary), planned upgrade to a relational database
- **NFC card** reading assumed via mobile browser + **Web NFC API** (for supported devices)

### Security Considerations

- **Low-risk environment**: cards function more like temporary boarding passes, not wallets or IDs
- **No sensitive data** stored on the card itself
- **Backend-verification logic** ensures cards can’t be faked for unlimited access
- System design emphasizes **simplicity** and **replaceability** over hardening (as cards are meant to be disposable)

### Future Improvements
- **Frontend upgrades**: make the registration and verifier apps more intuitive and mobile-responsive by improving their UI
- **Database migration**: shift from Google Sheets to a robust backend (e.g. Firebase or PostgreSQL)
- **Boarding analytics**: consistently log stop-level data for better insights
- **Card linking to user metadata** (optional for longer-term passes)
- **Offline functionality** for verifier web app to support poor signal areas

### Environmental Responsibility
Since the access cards are physical and plastic-based, we acknowledge their environmental impact. As part of our sustainability efforts, we propose a **card return program**, offering - the public a small incentive for returning expired cards. These returned cards will then be processed for reuse or recycling, reducing plastic waste.

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
