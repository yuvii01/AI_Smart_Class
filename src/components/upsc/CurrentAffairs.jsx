import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Dummy data for demonstration
const NEWS_DATA = [
  {
    id: 1,
    date: "2025-06-01",
    title: "GST Council Approves Rate Changes",
    summary: "The GST Council has approved several rate changes to boost the economy. The new rates will be effective from July 1. The council also discussed measures to simplify compliance for small businesses.",
    tags: ["Economy", "Polity"],
    source: "https://example.com/gst-news",
    relevance: ["Prelims Point", "Mains Relevance"],
  },
  {
    id: 2,
    date: "2025-05-31",
    title: "India Signs MoU with QUAD Nations",
    summary: "India has signed a Memorandum of Understanding with QUAD nations to enhance cooperation in the Indo-Pacific region. The agreement focuses on maritime security and technology sharing.",
    tags: ["International Relations", "Tech & Science"],
    source: "https://example.com/quad-news",
    relevance: ["Mains Relevance", "Essay Material"],
  },
  // ...add more dummy news items as needed
];

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

// Relevance tags
const RELEVANCE_TAGS = ["Prelims Point", "Mains Relevance", "Essay Material"];

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

const DateFilter = styled.select`
  padding: 7px 12px;
  border-radius: 8px;
  border: 1.5px solid #bdbdbd;
  font-size: 1rem;
  background: #fff;
  margin-left: 10px;
  margin-bottom: 10px;
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

function getDateNDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

const CurrentAffairs = () => {
  const [tab, setTab] = useState("daily");
  const [topic, setTopic] = useState("");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("ca_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [revised, setRevised] = useState(() => {
    const saved = localStorage.getItem("ca_revised");
    return saved ? JSON.parse(saved) : [];
  });

  // Filtered news for each tab
  let filteredNews = NEWS_DATA;

  // Daily News Tab
  if (tab === "daily") {
    filteredNews = NEWS_DATA
      .filter(item => {
        if (dateRange === "7") return item.date >= getDateNDaysAgo(7);
        if (dateRange === "30") return item.date >= getDateNDaysAgo(30);
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 15);
  }

  // By Topic Tab
  if (tab === "topic") {
    filteredNews = NEWS_DATA.filter(item =>
      topic ? item.tags.includes(topic) : true
    );
  }

  // Search Tab
  if (tab === "search") {
    filteredNews = NEWS_DATA.filter(item => {
      const q = search.toLowerCase();
      const inTitle = item.title.toLowerCase().includes(q);
      const inSummary = item.summary.toLowerCase().includes(q);
      const inTags = item.tags.some(tag => tag.toLowerCase().includes(q));
      let inDate = true;
      if (dateRange === "7") inDate = item.date >= getDateNDaysAgo(7);
      if (dateRange === "30") inDate = item.date >= getDateNDaysAgo(30);
      return (inTitle || inSummary || inTags) && inDate;
    });
  }

  // Bookmarks Tab
  if (tab === "bookmarks") {
    filteredNews = NEWS_DATA.filter(item => bookmarks.includes(item.id));
  }

  // Bookmark logic
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

  // Mark as revised logic
  const markAsRevised = (id) => {
    const updated = [...new Set([...revised, id])];
    setRevised(updated);
    localStorage.setItem("ca_revised", JSON.stringify(updated));
  };

  // Remove from revised
  const unmarkRevised = (id) => {
    const updated = revised.filter(r => r !== id);
    setRevised(updated);
    localStorage.setItem("ca_revised", JSON.stringify(updated));
  };

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
          <DateFilter value={dateRange} onChange={e => setDateRange(e.target.value)}>
            <option value="all">All Time</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </DateFilter>
        </div>
      )}

      {tab === "daily" && (
        <DateFilter value={dateRange} onChange={e => setDateRange(e.target.value)}>
          <option value="all">All Time</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </DateFilter>
      )}

      <NewsList>
        {filteredNews.length === 0 && <EmptyMsg>No news found.</EmptyMsg>}
        {filteredNews.map(item => (
          <NewsCard key={item.id} style={revised.includes(item.id) ? { opacity: 0.5 } : {}}>
            <Date>{item.date}</Date>
            <Title>{item.title}</Title>
            <Summary>{item.summary}</Summary>
            <Tags>
              {item.tags.map(tag => (
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
    </Wrapper>
  );
};

export default CurrentAffairs;