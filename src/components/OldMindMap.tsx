import {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { Tldraw, useEditor, loadSnapshot, exportToBlob } from "tldraw";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export type OldMindMapType = {
  className?: string;
  boardId: string;
  userId: string;
  idKey: number;
};

const OldMindMap: FunctionComponent<OldMindMapType> = ({
  className = "",
  boardId,
  userId,
  idKey,
}) => {
  const [documentState, setDocumentState] = useState(null);
  const [sessionState, setSessionState] = useState(null);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const imageRenderedRef = useRef(false); // Ref to track if the image has been rendered
  const navigate = useNavigate();
  const load = useCallback(async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/whiteboard/loadWhiteboard/${userId}/${boardId}`
      );
      const loadedDocument = JSON.parse(response.data.document);
      const loadedSession = JSON.parse(response.data.session);
      setDocumentState(loadedDocument);
      setSessionState(loadedSession);
    } catch (err) {}
  }, [userId, boardId]);

  useEffect(() => {
    load();
  }, [load]);
  const renderImage = useCallback(async (editor: any) => {
    try {
      if (!editor) return;

      const shapeIds = editor.getCurrentPageShapeIds();
      const blob = await exportToBlob({
        editor,
        ids: [...shapeIds],
        format: "png",
        opts: { background: false },
      });

      const url = window.URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      console.error("Error in renderImage:", error);
    }
  }, []);

  function InsideOfContext() {
    const editor = useEditor();

    useEffect(() => {
      if (
        editor &&
        documentState &&
        sessionState &&
        !imageRenderedRef.current
      ) {
        loadSnapshot(editor.store, {
          document: documentState,
          session: sessionState,
        });
        renderImage(editor);
        imageRenderedRef.current = true; // Mark the image as rendered
      }
    }, [editor, documentState, sessionState, renderImage]);

    return null;
  }

  if (error) {
    return <div></div>;
  }

  if (!documentState || !sessionState) {
    return <div></div>;
  }

  return (
    <div>
      <div
        className={`w-[300px] relative h-[300px] text-left text-xl text-black font-jaldi hover:animate-[1s_ease_0s_1_normal_none_shadow-drop-bottom] hover:opacity-[1] ${className}`}
      >
        <div className='absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%]'>
          <div className='absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-lavender' />
          <div className='absolute h-[74.67%] w-full top-[0%] right-[0%] bottom-[25.33%] left-[0%] rounded-t-xl rounded-b-none max-w-full overflow-hidden max-h-full object-cover'>
            <button
              className={`cursor-pointer [border:none] p-0 bg-[transparent] h-[300px] w-[300px] relative [&.animate]:animate-[1s_ease_0s_1_normal_forwards_shadow-drop-bottom] opacity-[1] hover:animate-[1s_ease_0s_1_normal_none_shadow-drop-bottom] hover:opacity-[1] ${className}`}
              onClick={() =>
                navigate("/oldWhiteboard", {
                  replace: true,
                  state: {
                    boardId: boardId,
                    userId: userId,
                  },
                })
              }
            >
              <div className='absolute top-0 left-0 w-full h-full bg-white'>
                <div className='z-5555'></div>
              </div>
              <div className='z-9999'>
                {imageUrl && (
                  <div className='absolute top-0 left-0 w-full h-full'>
                    <img
                      src={imageUrl}
                      alt='Rendered mind map'
                      className='w-full h-full object-cover rounded-xl'
                    />
                  </div>
                )}
              </div>
            </button>
            <div className='z-1'>
              <Tldraw>
                <InsideOfContext />
              </Tldraw>
            </div>
          </div>
        </div>
        <div className='absolute  bottom-[0%] left-[0%] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-lavender' />

        <div className='absolute h-[8%] w-[79.33%] top-[79.67%] left-[4.33%] inline-block z-20'>
          Whiteboard: {idKey + 1}
        </div>
        <div className='absolute h-[6%] w-[44.67%] top-[87.67%] left-[4.33%] text-mini inline-block z-20'>
          Last Edited: [date]
        </div>
      </div>
    </div>
  );
};

export default OldMindMap;
