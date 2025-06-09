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
const API_KEY = "e9ea544e7c267495c9c65ff1b09b5fbf"; 
const API_URL = "http://api.mediastack.com/v1/news";


//http://api.mediastack.com/v1/news?access_key=e9ea544e7c267495c9c65ff1b09b5fbf&categories=technology,science&languages=en
// Fetch news from API and return in required JSON format
async function runFetchNews({ topic = "", search = "", page = 1, pageSize = 10 }) {
  let url = "";
  // Build Guardian API URL for all cases
  if (topic && search) {
    url = `https://content.guardianapis.com/search?q=${encodeURIComponent(topic + " AND " + search)}&page-size=${pageSize}&page=${page}&api-key=test`;
  } else if (topic) {
    url = `https://content.guardianapis.com/search?q=${encodeURIComponent(topic)}&page-size=${pageSize}&page=${page}&api-key=test`;
    console.log("Fetching topic:", url);
  } else if (search) {
    url = `https://content.guardianapis.com/search?q=${encodeURIComponent(search)}&page-size=${pageSize}&page=${page}&api-key=test`;
  } else {
    // Daily news: add Indian context and UPSC-relevant tags to the query
    url = `https://content.guardianapis.com/search?q=${encodeURIComponent(
      'india OR indian-government OR upsc OR nta OR schemes OR policy OR economy OR environment OR science OR technology OR international OR governance OR social issues OR current affairs OR news OR "daily news" OR "current events" OR "latest updates" OR "government schemes" OR "international relations" OR "science and technology" OR "environmental issues" OR "economic policies" OR "social issues" OR "governance reforms" OR "upsc preparation" OR "nta exams"'
    )}&page-size=${pageSize}&page=${page}&api-key=test`;
    console.log("Fetching daily news:", url);
  }

  const res = await fetch(url);
  const data = await res.json();

  if (data.response && data.response.results) {
    return data.response.results.map((item, idx) => ({
      id: item.id || idx + Math.random(),
      date: item.webPublicationDate ? item.webPublicationDate.slice(0, 10) : "",
      title: item.webTitle,
      summary: "", // Guardian API does not provide summary/description
      tags: [
        item.sectionName,
        // Add UPSC-relevant tags based on title/section for daily news
        ...(item.webTitle && item.webTitle.toLowerCase().includes("government") ? ["Government"] : []),
        ...(item.webTitle && item.webTitle.toLowerCase().includes("policy") ? ["Policy"] : []),
        ...(item.webTitle && item.webTitle.toLowerCase().includes("economy") ? ["Economy"] : []),
        ...(item.webTitle && item.webTitle.toLowerCase().includes("environment") ? ["Environment"] : []),
        ...(item.webTitle && item.webTitle.toLowerCase().includes("science") ? ["Science & Tech"] : []),
        ...(item.webTitle && item.webTitle.toLowerCase().includes("technology") ? ["Science & Tech"] : []),
        ...(item.webTitle && item.webTitle.toLowerCase().includes("international") ? ["International"] : []),
        ...(item.webTitle && item.webTitle.toLowerCase().includes("india") ? ["India"] : []),
        ...(item.webTitle && item.webTitle.toLowerCase().includes("governance") ? ["Governance"] : []),
        ...(item.webTitle && item.webTitle.toLowerCase().includes("schemes") ? ["Schemes"] : []),
        ...(item.webTitle && item.webTitle.toLowerCase().includes("social") ? ["Social Issues"] : []),
        ...(item.webTitle && item.webTitle.toLowerCase().includes("upsc") ? ["UPSC"] : []),
      ],
      source: item.webUrl,
      image: "", // Guardian API search does not provide image
      relevance: [],
    }));
  }
  return [];
}

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