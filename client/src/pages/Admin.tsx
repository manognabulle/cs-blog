import { useEffect, useState } from "react";

export default function Admin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    image_url: "",
    category: "",
    author: "",
    read_time: "",
    is_featured: false,
    video_url: "",
  });

  // Fetch posts
  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      image_url: "",
      category: "",
      author: "",
      read_time: "",
      is_featured: false,
      video_url: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      await fetch(`/api/posts/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Post Updated!");
    } else {
      // CREATE
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Post Created!");
    }

    fetchPosts();
    resetForm();
  };

  const deletePost = async (id: number) => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    fetchPosts();
  };

  const startEdit = (post: any) => {
    setForm(post);
    setEditingId(post.id);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Panel</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
        {Object.keys(form).map((key) =>
          key === "is_featured" ? (
            <div key={key}>
              <label>
                <input
                  type="checkbox"
                  checked={(form as any)[key]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      is_featured: e.target.checked,
                    })
                  }
                />
                Featured
              </label>
            </div>
          ) : (
            <div key={key} style={{ marginBottom: 10 }}>
              <input
                placeholder={key}
                value={(form as any)[key] || ""}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                style={{ width: "100%", padding: 8 }}
              />
            </div>
          )
        )}

        <button type="submit">
          {editingId ? "Update Post" : "Create Post"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>All Posts</h2>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{post.title}</h3>

          <button
            onClick={() => startEdit(post)}
            style={{
              background: "blue",
              color: "white",
              padding: "6px 12px",
              marginRight: 10,
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deletePost(post.id)}
            style={{
              background: "red",
              color: "white",
              padding: "6px 12px",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
