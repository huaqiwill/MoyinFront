import plugin from './plugin'
import renderElemConf from './render-elem'
import elemToHtmlConf from './elem-to-html'
import parseElemHtmlConf from './parse-elem-html'



export default {
  editorPlugin: plugin,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf],
  parseElemsHtml: [parseElemHtmlConf],
}
