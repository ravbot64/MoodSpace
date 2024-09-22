import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Button, TextInput, Container, Title } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../../stores/authStore";

function JournalEditor() {
  const [content, setContent] = useState(
    "<p>Date: March 9, 2023</p><p>Today, I am grateful for:</p><ul><li>The warm cup of coffee I had this morning that helped me start my day off right.</li><li>The beautiful sunrise I saw on my way to work that reminded me of the beauty in nature.</li><li>The supportive friends and family in my life who are always there for me when I need them.</li><li>The fact that I have a job that allows me to support myself and pursue my passions.</li> <li>The opportunity to take a walk outside during my lunch break and soak up some sunshine and fresh air.</li><p>Writing down these things I am grateful for helps me appreciate the positive aspects of my life and shifts my focus away from negativity. It reminds me that even on the toughest days, there are still things to be grateful for and that there is always something to look forward to tomorrow.</p>"
  );
  const [title, setTitle] = useState("Why are you feeling this way?");
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((store) => store.token);
  const apiUrl = useAuthStore((store) => store.apiUrl);
  const navigate = useNavigate();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate: () => setContent(editor.getHTML()),
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/v1/journal`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          title,
        }),
      });
      if (!response.ok) {
        throw new Error("Unable to add journal");
      }
      navigate("/dashboard");
    } catch (err) {
      console.log(err.message || "Unable to add journal");
      navigate("/dashboard/journal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container p={20}>
      <Title order={1} mb={10}>
        Enter your Journal
      </Title>
      <TextInput
        label="Journal Title" // Add a label
        placeholder="Enter a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb={5}
      />
      <RichTextEditor editor={editor} mb={20}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
      <Button
        variant="gradient"
        gradient={{ from: "#05372C", to: "#70D560", deg: 90 }}
        fullWidth
        onClick={onSubmit}
        loading={loading}
        disabled={loading}
      >
        Save Entry
      </Button>
    </Container>
  );
}

export default JournalEditor;
