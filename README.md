
This is a Contacts App based on [Next.js](https://nextjs.org/), bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Deployed on Vercel

Check out Contacts App at [Contacts App Website](https://ghof-contacts-app.vercel.app) for live demo.

## About Contacts App
Main Features:
- **Contact List** - It's provide contact list from Graphql API. Displaying first name, last name, and one phone number. Contact list only display favorites contact (if favorite list not empty) and followed by 10 regular contacts on the initial page load. Scroll element is used for **pagination** method, if scroll bar reach bottom element and   the API still contains contact data, the data will be displayed. **Regular contact can changed to favorite contact** by clicking star icon.
- **Favorites List** - It stored using local storage browser. Data stored is only id contact, so if data contacts changed on API, data favorites will up to date (fetch by id for favorites). **Favorite contact can changed to regular contact** by clicking star icon.
- **Create Contact** - Contact can be created after input **valid first name** and **valid last name** (only alphabet character) and **valid phone** number (only allow numeric with length 8 - 16 character).  It showing error message if you enter invalid data.
- **Delete Contact** - By clicking dot icon on contact list (regular or favorite), it will popup menu delete. By clicking delete button, data will be removed form list and from API.
- **Detail Contact** - By clicking contact list, it will redirect to detail page. Detail page showing information about contact and show multiple number phone (if contact have multiple number).
- **Search Contact** - Search contact by first name or last name. Empty search input will reset search results.

Page Performance (Tested using lighthouse)
- Desktop
<img src="https://github.com/ghofaralhasyim/contact-app-next/blob/master/image-info/lighthouse-desktop.JPG" width=200>
- Mobile
<img src="https://github.com/ghofaralhasyim/contact-app-next/blob/master/image-info/lighthouse-mobile.JPG" width=200>
- It use @next/image & load with one file svg icon, for better performance.

**still learning to create better app with React / NextJs.

