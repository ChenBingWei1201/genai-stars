function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center h-32 w-full border-t bg-white gap-3">
      <div className="flex flex-row items-center justify-center">
        <a
          href="https://github.com/ChenBingWei1201/genai-stars"
          target="_blank"
        >
          <img src="/images/github.png" alt="github link" className="w-9 m-2" />
        </a>
        <a href="https://www.facebook.com" target="_blank">
          <img
            src="/images/facebook.png"
            alt="facebook link"
            className="w-9 m-2"
          />
        </a>
        <a href="https://www.linkedin.com" target="_blank">
          <img
            src="/images/linkedin.png"
            alt="linkedin link"
            className="w-9 m-2"
          />
        </a>
        <a href="https://x.com/home" target="_blank">
          <img src="/images/x.png" alt="x link" className="w-9 m-2" />
        </a>
      </div>
      <p className="text-lg font-semibold">© 2024 大家不要再內卷AI</p>
    </footer>
  );
}

export default Footer;
