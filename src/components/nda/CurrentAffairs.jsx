import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Topics for By Topic tab
const TOPICS = [
  "Polity",
  "Economy",
  "Environment",
  "Tech & Science",
  "International Relations",
  "Governance",
  "Schemes",
  "Social Issues",
];

// Styled Components
const Wrapper = styled.div`
  max-width: 700px;
  margin: 32px auto;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10);
  padding: 18px 12px 24px 12px;
  min-height: 70vh;
`;

const Tabs = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
  justify-content: center;
`;

const Tab = styled.button`
  background: ${({ active }) => (active ? "#1976d2" : "#e3f0ff")};
  color: ${({ active }) => (active ? "#fff" : "#1976d2")};
  border: none;
  border-radius: 8px 8px 0 0;
  padding: 10px 22px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.18s;
  outline: none;
`;

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 420px;
  overflow-y: auto;
  margin-bottom: 12px;
`;

const NewsCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.07);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.08rem;
  color: #174ea6;
`;

const Date = styled.div`
  font-size: 0.95rem;
  color: #888;
`;

const Summary = styled.div`
  font-size: 1rem;
  color: #222;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #e3f0ff;
  color: #1976d2;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.92rem;
  font-weight: 500;
`;

const RelevanceTag = styled(Tag)`
  background: #ffe0b2;
  color: #b26a00;
`;

const SourceLink = styled.a`
  color: #1976d2;
  font-size: 0.95rem;
  text-decoration: underline;
  margin-left: 6px;
`;

const BookmarkBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: ${({ bookmarked }) => (bookmarked ? "#ff9800" : "#bdbdbd")};
  transition: color 0.18s;
`;

const Dropdown = styled.select`
  padding: 7px 12px;
  border-radius: 8px;
  border: 1.5px solid #bdbdbd;
  font-size: 1rem;
  background: #fff;
  margin-bottom: 14px;
`;

const SearchBar = styled.input`
  padding: 7px 12px;
  border-radius: 8px;
  border: 1.5px solid #bdbdbd;
  font-size: 1rem;
  background: #fff;
  margin-bottom: 10px;
  width: 60%;
`;

const MarkRevisedBtn = styled.button`
  background: #43a047;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.92rem;
  font-weight: 500;
  margin-left: 8px;
  cursor: pointer;
`;

const EmptyMsg = styled.div`
  text-align: center;
  color: #888;
  margin-top: 30px;
  font-size: 1.1rem;
`;

// --- API CALL FUNCTIONS ---
const API_KEY = "8e14109d2d6c4fe3a7010bd628924afa";
const API_URL = "https://newsapi.org/v2/everything";

// Fetch news from API and return in required JSON format
async function runFetchNews({ topic = "", search = "", page = 1, pageSize = 10 }) {
  let url = "";

  if (topic && search) {
    url = `${API_URL}?apiKey=${API_KEY}&q=${encodeURIComponent(topic + " " + search)}&page=${page}&pageSize=${pageSize}&language=en&sortBy=publishedAt`;
  } else if (topic) {
    url = `${API_URL}?apiKey=${API_KEY}&q=${encodeURIComponent(topic)}&page=${page}&pageSize=${pageSize}&language=en&sortBy=publishedAt`;
  } else if (search) {
    url = `${API_URL}?apiKey=${API_KEY}&q=${encodeURIComponent(search)}&page=${page}&pageSize=${pageSize}&language=en&sortBy=publishedAt`;
  } else {
    url = `${API_URL}?apiKey=${API_KEY}&q=${encodeURIComponent(
      'government schemes OR indian economy OR polity OR governance OR environment OR ecology OR "social issues" OR "science and technology" OR "international relations" OR "global events" OR "international organizations" OR "india foreign policy" OR "global economy" OR "international reports" OR "international treaties" OR "climate summit"'
    )}&page=${page}&pageSize=${pageSize}&language=en&sortBy=publishedAt`;
  }

  const res = await fetch(url);
  const data = await res.json();
  if (data.articles) {
    return data.articles.map((item, idx) => ({
      id: item.url || idx + Math.random(),
      date: item.publishedAt ? item.publishedAt.slice(0, 10) : "",
      title: item.title,
      summary: item.description || "",
      tags: topic ? [topic] : [],
      source: item.url,
      image: item.urlToImage || "",
      relevance: [],
    }));
  }
  return [];
}

// --- MAIN COMPONENT ---
const CurrentAffairs = () => {
  const [tab, setTab] = useState("daily");
  const [topic, setTopic] = useState("");
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("ca_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [revised, setRevised] = useState(() => {
    const saved = localStorage.getItem("ca_revised");
    return saved ? JSON.parse(saved) : [];
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // --- FETCH NEWS FUNCTION ---
  const onSent = async ({ topic = "", search = "", page = 1 }) => {
    setLoading(true);
    const data = await runFetchNews({ topic, search, page, pageSize: 10 });
    setLoading(false);
    return data;
  };

  useEffect(() => {
    setPage(1);
    setNews([]);
    setHasMore(true);
    let fetchParams = { page: 1 };
    if (tab === "topic" && topic) fetchParams.topic = topic;
    if (tab === "search" && search) fetchParams.search = search;
    onSent(fetchParams).then(data => {
      setNews(data);
      setHasMore(data.length === 10);
    });
    // eslint-disable-next-line
  }, [tab, topic, search]);

  // --- LOAD MORE ---
  const loadMore = async () => {
    const nextPage = page + 1;
    let fetchParams = { page: nextPage };
    if (tab === "topic" && topic) fetchParams.topic = topic;
    if (tab === "search" && search) fetchParams.search = search;
    const moreData = await onSent(fetchParams);
    setNews(prev => [...prev, ...moreData]);
    setPage(nextPage);
    setHasMore(moreData.length === 10);
  };

  // --- BOOKMARK LOGIC ---
  const toggleBookmark = (id) => {
    let updated;
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter(b => b !== id);
    } else {
      updated = [...bookmarks, id];
    }
    setBookmarks(updated);
    localStorage.setItem("ca_bookmarks", JSON.stringify(updated));
  };

  // --- MARK AS REVISED LOGIC ---
  const markAsRevised = (id) => {
    const updated = [...new Set([...revised, id])];
    setRevised(updated);
    localStorage.setItem("ca_revised", JSON.stringify(updated));
  };

  const unmarkRevised = (id) => {
    const updated = revised.filter(r => r !== id);
    setRevised(updated);
    localStorage.setItem("ca_revised", JSON.stringify(updated));
  };

  // --- FILTERED NEWS FOR BOOKMARKS TAB ---
  let filteredNews = news;
  if (tab === "bookmarks") {
    filteredNews = news.filter(item => bookmarks.includes(item.id));
  }

  return (
    <Wrapper>
      <Tabs>
        <Tab active={tab === "daily"} onClick={() => setTab("daily")}>📰 Daily News</Tab>
        <Tab active={tab === "topic"} onClick={() => setTab("topic")}>📚 By Topic</Tab>
        <Tab active={tab === "search"} onClick={() => setTab("search")}>🔍 Search</Tab>
        <Tab active={tab === "bookmarks"} onClick={() => setTab("bookmarks")}>🔖 Bookmarks</Tab>
      </Tabs>

      {tab === "topic" && (
        <Dropdown value={topic} onChange={e => setTopic(e.target.value)}>
          <option value="">All Topics</option>
          {TOPICS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Dropdown>
      )}

      {tab === "search" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <SearchBar
            placeholder="Search keywords (e.g. GST, Quad, ISRO)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      <NewsList>
        {loading && <EmptyMsg>Loading...</EmptyMsg>}
        {!loading && filteredNews.length === 0 && <EmptyMsg>No news found.</EmptyMsg>}
        {filteredNews.map(item => (
          <NewsCard key={item.id} style={revised.includes(item.id) ? { opacity: 0.5 } : {}}>
            {item.image && (
  <img
    src={item.image}
    alt={item.title}
    style={{
      width: "100%",
      height: "180px", // Set a fixed height for the rectangle
      objectFit: "cover", // Ensures the image covers the area
      objectPosition: "center", // Centers the image
      borderRadius: "8px",
      display: "block",
      marginBottom: "8px"
    }}
  />
)}
            <Date>{item.date}</Date>
            <Title>{item.title}</Title>
            <Summary>{item.summary}</Summary>
            <Tags>
              {item.tags && item.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              {item.relevance && item.relevance.map(rel => (
                <RelevanceTag key={rel}>{rel}</RelevanceTag>
              ))}
            </Tags>
            {item.source && (
              <SourceLink href={item.source} target="_blank" rel="noopener noreferrer">
                Source
              </SourceLink>
            )}
            <BookmarkBtn
              bookmarked={bookmarks.includes(item.id)}
              onClick={() => toggleBookmark(item.id)}
              title={bookmarks.includes(item.id) ? "Remove Bookmark" : "Bookmark"}
            >
              {bookmarks.includes(item.id) ? "★" : "☆"}
            </BookmarkBtn>
            {tab === "bookmarks" && (
              revised.includes(item.id) ? (
                <MarkRevisedBtn onClick={() => unmarkRevised(item.id)}>
                  Unmark as Revised
                </MarkRevisedBtn>
              ) : (
                <MarkRevisedBtn onClick={() => markAsRevised(item.id)}>
                  Mark as Revised
                </MarkRevisedBtn>
              )
            )}
          </NewsCard>
        ))}
      </NewsList>
      {hasMore && !loading && (
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 24px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              marginTop: 8,
            }}
            onClick={loadMore}
          >
            Show More
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default CurrentAffairs;