import React from "react";

// import "./styles.css";
import EditableBlock from "../components/EditableBlock";

import { uid } from "../utils/uid";
import { setCaretToEnd } from "../utils/caretHelpers";

const initialBlock = { id: uid(), html: "", tag: "p" };
// JSON.parse(localStorage.getItem("blocks"));

class EditablePage extends React.Component {
  constructor(props) {
    super(props);
    this.updatePageHandler = this.updatePageHandler.bind(this);
    this.addBlockHandler = this.addBlockHandler.bind(this);
    this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
    this.addPlaceholder = this.addPlaceholder.bind(this);
    this.state = {
      blocks: JSON.parse(localStorage.getItem("blocks")) || [initialBlock],
    };
  }

  updatePageHandler(updatedBlock) {
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
    };
    this.setState({ blocks: updatedBlocks }, () =>
      localStorage.setItem("blocks", JSON.stringify(updatedBlocks))
    );
    // console.log("updating");
  }

  addBlockHandler(currentBlock) {
    const newBlock = { id: uid(), html: "", tag: "p" };
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);
    this.setState({ blocks: updatedBlocks }, () => {
      currentBlock.ref.nextElementSibling.focus();
    });
  }

  deleteBlockHandler(currentBlock) {
    // Only delete the block, if there is a preceding one
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (this.state.blocks.length > 1) {
      const blocks = this.state.blocks;
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      this.setState({ blocks: updatedBlocks }, () => {
        setCaretToEnd(previousBlock);
        previousBlock.focus();
      });
    }
  }

  // Show a placeholder for blank pages
  addPlaceholder({ block, position, content }) {
    const isFirstBlockWithoutHtml = position === 1 && !content;
    const isFirstBlockWithoutSibling = !block.parentElement.nextElementSibling;
    if (isFirstBlockWithoutHtml && isFirstBlockWithoutSibling) {
      this.setState({
        ...this.state,
        html: "Type a page title...",
        tag: "h1",
        imageUrl: "",
        placeholder: true,
        isTyping: false,
      });
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="Page max-w-screen-md mx-auto">
        <h1 className="text-4xl font-bold text-slate-600 my-5">Instawriter</h1>
        {this.state.blocks.map((block, key) => {
          return (
            <EditableBlock
              key={key}
              id={block.id}
              tag={block.tag}
              html={block.html}
              updatePage={this.updatePageHandler}
              addBlock={this.addBlockHandler}
              deleteBlock={this.deleteBlockHandler}
            />
          );
        })}
      </div>
    );
  }
}

export default EditablePage;
