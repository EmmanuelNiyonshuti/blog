import CopyButton from './CopyButton';

export default function CodeBlock({ children, ...props }) {
  const getCodeText = (node) => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getCodeText).join('');
    if (node?.props?.children) return getCodeText(node.props.children);
    return '';
  };

  const codeText = getCodeText(children);

  return (
    <div className="relative my-6">
      <pre {...props} className="my-0!">
        {children}
      </pre>
      <CopyButton code={codeText} />
    </div>
  );
}