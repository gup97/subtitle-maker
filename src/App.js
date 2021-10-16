import React from 'react';
import TextInput from './components/TextInput';
import UploadImage from './components/UploadImage';
import DownloadImage from './components/DownloadImage';
import TextOption from './components/TextOption';
// import CanvasSize from './components/CanvasSize';
import 도지 from './components/assets/intro.png';
import './App.css'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "파일을 선택하고 자막을 넣어보세요",
      href: "/",
      width: "500",
      height: "500",
      img: 도지,

      fontFamily: 'Nanum Gothic',
      fontColor: "White",
      fontSize: 30,
    };
    this.canvasRef = React.createRef();
  }
  handleCanvasHref = href => {
    this.setState({ href });
  };
  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };
  handleFontsizeChange = e => {
    this.setState({ fontSize: e.target.value });
  };
  handleImgChange = fileURL => {
    this.setState({ img: fileURL });
  };
  handleCanvasSize = e => {
    if (e.target.name === "width")
      this.setState({ width: e.target.value })
    else if (e.target.name === "height")
      this.setState({ height: e.target.value })
  };

  createCanvas() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { text, img } = this.state;
    // const { width, height} = state;
    const image = new Image();
    image.src = img;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      this.setFont(canvas, text);
    }
  }
  setFont(canvas, text) {
    const ctx = canvas.getContext("2d");
    const { fontFamily, fontSize, fontColor } = this.state;
    const { textBorder } = 'black';

    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'middle';
    ctx.font = `normal ${fontSize}px ${fontFamily}`;

    const lines = text.split('\n');
    lines.forEach((line, index) => {
      // ctx.shadowColor = 'black';
      // ctx.shadowBlur = 10;
      ctx.lineWidth = fontSize / 6;
      ctx.strokeStyle = `${textBorder}`;
      ctx.strokeText(
        line,
        canvas.width / 2,
        canvas.height - fontSize * (lines.length - index) * 1.5,
      );

      ctx.fillStyle = fontColor;
      ctx.fillText(
        line,
        canvas.width / 2,
        canvas.height - fontSize * (lines.length - index) * 1.5,
      );
    });
  };
  componentDidMount() {
    this.createCanvas();

  }
  componentDidUpdate() {
    this.createCanvas();
  }
  render() {
    return (
      <div>
        <h1>자막생성기 BETA</h1>
        <UploadImage imageChange={this.handleImgChange} />
        <div className="canvasTab">
          <canvas ref={this.canvasRef} className="previewCanvas" />
        </div>
        {/* 기능 구현 예정 (자르기) */}
        {/* <CanvasSize width={this.state.width} height={this.state.height} onChange={this.handleCanvasSize} /> */}
        <TextInput onChange={this.handleTextChange} />
        {/* font 관련 옵션 */}
        <TextOption fontSize={this.state.fontSize}
          onChange={this.handleFontsizeChange} />
        <DownloadImage href={this.state.href}
          canvas={this.canvasRef}
          handleCanvasHref={this.handleCanvasHref} />
      </div>
    )
  }
}
export default App;
