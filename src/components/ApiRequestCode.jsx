import codeGenerator from "../utils/codeGenerator"
import { CodeBlock, atomOneDark } from 'react-code-blocks';

const ApiRequestCode = ({language,url,method}) => {

  const code = codeGenerator({language:language.toLowerCase(),url:url,payload:"{}",type:method})



  return (
    <div className="break-all">
      {
        code?  <CodeBlock
        text={code}
        customStyle={{backgroundColor:"rgb(40, 44, 53)",paddingInline:'0.5rem',paddingBlock:"0.3rem"}}
        lineNumberContainerStyle={{lineHeight:1}}
        language={language.toLowerCase()==="curl"?"bash":language.toLowerCase()}
        showLineNumbers= {false}
        theme={atomOneDark}
        
      />:null
      }


    </div>
  )
}

export default ApiRequestCode