function LinkList({links}) {
    return (
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <img src={link.icon} alt={link.name} />
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    );
}
  
export default function WebHub() {
    const links = [
      {
        url: 'https://youtube.com/',
        icon: 'https://youtube.com/favicon.ico',
        name: 'Youtube',
      },
      {
        url: 'https://chat.openai.com/',
        icon: 'https://chat.openai.com/favicon.ico',
        name: 'ChatGPT',
      }
    ];
  
    return (
      <div className='webhub-container'>
        <h1>Website Links</h1>
        <LinkList links={links} />
      </div>
    );
}