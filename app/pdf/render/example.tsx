import { Page, Text, Document, renderToBuffer } from '@react-pdf/renderer';

export function RenderExample() {
	return renderToBuffer(
		<Document title="Example PDF" author="Remix.js">
			<Page size="A4" style={{
				paddingTop: "1cm",
				paddingBottom: "1cm",
				paddingHorizontal: "1.5cm"
			}} orientation="portrait">

				<Text style={{
					fontSize: 12,
					marginBottom: "0.5cm",
					textAlign: 'center',
				}}>
					Hello from a PDF
				</Text>
			</Page>
		</Document>
	)
};
