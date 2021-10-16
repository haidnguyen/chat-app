import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MainLayoutComponent } from '@app/layouts/main-layout';
import { render } from '@testing-library/angular';

const headingMesssageStub = 'Heading Message';
const contentMessageStub = 'Content Message';

@Component({
  selector: 'app-test-component',
  template: `
    <app-main-layout>
      <h1 heading>{{ headingMessage }}</h1>
      <div content>
        {{ contentMessage }}
      </div>
    </app-main-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {
  @Input() headingMessage = headingMesssageStub;
  @Input() contentMessage = contentMessageStub;
}

const renderComponent = () =>
  render(TestComponent, {
    declarations: [MainLayoutComponent],
    componentProperties: {
      headingMessage: headingMesssageStub,
      contentMessage: contentMessageStub,
    },
  });

describe(MainLayoutComponent.name, () => {
  it('should match snapshot', async () => {
    const component = await renderComponent();

    expect(component.container).toMatchSnapshot();
  });

  it(`should contain "${headingMesssageStub}" in rendered DOM`, async () => {
    const { queryByText } = await renderComponent();

    expect(queryByText(headingMesssageStub)).toBeInTheDocument();
  });

  it(`should contain "${contentMessageStub}" in rendered DOM`, async () => {
    const { queryByText } = await renderComponent();

    expect(queryByText(contentMessageStub)).toBeInTheDocument();
  });
});
