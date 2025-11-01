# Personal Notes 🦝
I used this markdown to note any topic I came across while solving the playgrounds that caught my eye - 
Continue with caution!

# Playground #3

## I'm blind - I'm deaf - I wanna be a web developer
Regarding css I had no real issues with the color contrast as I already fixed it in playground #2. The tricky part was making a suitable screen reader experience and allow for most of the content to be read aloud and navigateable by keyboard.

I took the time to add navigation-skip links since I got inspired by google and wikipedia as they have a nice skip-links. To not clutter my css even more I added all of the css for it in the `css/accessability.css` file. I also added a few aria-labels which I want to explain shorty:
 - `aria-live & aria-busy`: These two attributes are used to announce changes in the DOM. `live` indicates that content will be updated and `busy`shows that the content is being updated. You need to set `busy`to false when the content is updated tho.
 - `aria-labelledby`: This attribute is used to associate a label with an element. This is useful when you want to use the `aria-label` attribute but you don't want to repeat the label text.
 - `role`: This attribute is used to define the role of an element. Roles give more meaning to elements in addition to the `aria-label` attribute.

## Link Collection
![ARIA states and propeties - (Useful to see what's available)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes)

![ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Techniques)