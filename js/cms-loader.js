/**
 * CMS Content Loader
 * Loads content from content/ directory managed by Decap CMS
 */

const CMSLoader = {
  BASE_URL: 'https://raw.githubusercontent.com/Zephyr-Chan/zephyr-chan.github.io/main/content/',

  // Simple YAML frontmatter parser
  parseFrontmatter(markdown) {
    const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { data: {}, content: markdown };

    const data = {};
    match[1].split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        let value = valueParts.join(':').trim();
        // Remove quotes
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        // Parse arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''));
        }
        data[key.trim()] = value;
      }
    });

    return { data, content: match[2].trim() };
  },

  // Load all files from a content folder
  async loadCollection(folder) {
    try {
      const indexResp = await fetch(this.BASE_URL + folder + '/index.json');
      if (indexResp.ok) {
        const index = await indexResp.json();
        const items = [];
        for (const file of index) {
          const resp = await fetch(this.BASE_URL + folder + '/' + file);
          if (resp.ok) {
            const markdown = await resp.text();
            const { data, content } = this.parseFrontmatter(markdown);
            items.push({ ...data, content, filename: file });
          }
        }
        return items;
      }
    } catch (e) {
      console.log('CMS: Could not load index.json for', folder);
    }
    return [];
  },

  // Load a single file
  async loadFile(path) {
    try {
      const resp = await fetch(this.BASE_URL + path);
      if (resp.ok) {
        const markdown = await resp.text();
        return this.parseFrontmatter(markdown);
      }
    } catch (e) {
      console.log('CMS: Could not load file', path);
    }
    return null;
  }
};
